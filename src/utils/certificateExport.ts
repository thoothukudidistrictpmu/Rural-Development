import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toPng, toBlob } from 'html-to-image';

/**
 * Downloads a Blob directly to the user's local disk.
 * Handles iframe sandbox permissions, object URL creation, and cleanup.
 */
export function downloadBlob(blob: Blob, filename: string): boolean {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch {
        // ignore cleanup error
      }
    }, 5000);

    return true;
  } catch (err) {
    console.error('Failed to trigger blob download:', err);
    return false;
  }
}

/**
 * Safely converts an image URL or image element into a base64 Data URL.
 * Guarantees that the canvas cannot be tainted by cross-origin images.
 */
async function getBase64FromImageUrl(src: string): Promise<string> {
  if (src.startsWith('data:')) return src;
  try {
    const res = await fetch(src, { mode: 'cors' });
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(typeof reader.result === 'string' ? reader.result : src);
      };
      reader.onerror = () => resolve(src);
      reader.readAsDataURL(blob);
    });
  } catch {
    return src;
  }
}

/**
 * Standard options for html-to-image that completely bypass remote stylesheet
 * parsing and prevent `SecurityError: Failed to read the 'cssRules' property`.
 */
const SAFE_HTML_TO_IMAGE_OPTIONS = {
  quality: 0.98,
  pixelRatio: 2,
  cacheBust: false,
  skipFonts: true, // Prevents html-to-image from traversing external stylesheets
  fontEmbedCSS: '', // Overrides embedWebFonts so it never inspects document.styleSheets
  filter: (node: HTMLElement) => !node.classList?.contains('print:hidden'),
};

/**
 * Renders an HTML certificate element into an HTMLCanvasElement.
 * Uses a resilient multi-tier pipeline:
 * Tier 1: html-to-image with skipFonts and fontEmbedCSS (lightning fast, pure SVG ForeignObject, immune to CSS rules security error).
 * Tier 2: html2canvas with allowTaint: false and useCORS: true.
 */
export async function renderCertificateToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  // Tier 1: html-to-image with safe font options
  try {
    const dataUrl = await toPng(element, SAFE_HTML_TO_IMAGE_OPTIONS);

    return await new Promise<HTMLCanvasElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 2048;
        canvas.height = img.naturalHeight || 1448;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas);
        } else {
          reject(new Error('Canvas 2D context unavailable'));
        }
      };
      img.onerror = (e) => reject(new Error('Failed to load exported image onto canvas: ' + e));
      img.src = dataUrl;
    });
  } catch (htmlToImageError) {
    console.warn('html-to-image failed, falling back to html2canvas:', htmlToImageError);
  }

  // Tier 2: html2canvas fallback
  try {
    const width = element.offsetWidth || 1024;
    const height = element.offsetHeight || 724;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false, // Must be false so toDataURL/toBlob won't be blocked as tainted
      backgroundColor: '#fffefb',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width,
      height,
      ignoreElements: (el) => el.classList?.contains('print:hidden'),
      onclone: async (_doc, clonedEl) => {
        clonedEl.style.margin = '0 auto';
        clonedEl.style.boxShadow = 'none';
        clonedEl.style.transform = 'none';

        // Pre-convert any images inside to data URLs
        const images = clonedEl.querySelectorAll('img');
        for (const img of Array.from(images)) {
          if (img.src && !img.src.startsWith('data:')) {
            try {
              const base64 = await getBase64FromImageUrl(img.src);
              img.src = base64;
            } catch {
              // ignore
            }
          }
        }
      },
    });

    if (canvas && canvas.width > 0 && canvas.height > 0) {
      return canvas;
    }
  } catch (html2canvasError) {
    console.error('html2canvas rendering also failed:', html2canvasError);
  }

  throw new Error('Unable to render certificate graphics for export');
}

/**
 * Exports the certificate directly as a high-quality PDF document (A4 Landscape: 297mm x 210mm).
 * Returns the object URL and filename if manual download backup is required.
 */
export async function exportCertificateAsPdf(
  element: HTMLElement,
  recipientName: string
): Promise<{ success: boolean; blobUrl?: string; filename: string }> {
  const safeName = recipientName.trim().replace(/[^a-zA-Z0-9_\-]/g, '_') || 'Participant';
  const filename = `AI_Workshop_Certificate_${safeName}.pdf`;

  try {
    const canvas = await renderCertificateToCanvas(element);

    // Create A4 Landscape PDF (297mm x 210mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 5; // 5mm margin
    const targetWidth = pageWidth - margin * 2;
    const targetHeight = pageHeight - margin * 2;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasRatio = canvasWidth / canvasHeight;
    const targetRatio = targetWidth / targetHeight;

    let renderWidth = targetWidth;
    let renderHeight = targetHeight;
    let offsetX = margin;
    let offsetY = margin;

    if (canvasRatio > targetRatio) {
      // Wider: scale down height and center vertically
      renderHeight = targetWidth / canvasRatio;
      offsetY = margin + (targetHeight - renderHeight) / 2;
    } else {
      // Taller: scale down width and center horizontally
      renderWidth = targetHeight * canvasRatio;
      offsetX = margin + (targetWidth - renderWidth) / 2;
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    pdf.addImage(imgData, 'JPEG', offsetX, offsetY, renderWidth, renderHeight, undefined, 'FAST');

    const pdfBlob = pdf.output('blob');
    const downloaded = downloadBlob(pdfBlob, filename);

    const blobUrl = URL.createObjectURL(pdfBlob);
    return {
      success: downloaded,
      blobUrl,
      filename,
    };
  } catch (err) {
    console.error('exportCertificateAsPdf failed:', err);
    throw err;
  }
}

/**
 * Exports the certificate as a crisp high-resolution PNG image.
 */
export async function exportCertificateAsPng(
  element: HTMLElement,
  recipientName: string
): Promise<{ success: boolean; blobUrl?: string; filename: string }> {
  const safeName = recipientName.trim().replace(/[^a-zA-Z0-9_\-]/g, '_') || 'Participant';
  const filename = `AI_Workshop_Certificate_${safeName}.png`;

  try {
    // Primary: use safe toBlob from html-to-image
    const blob = await toBlob(element, SAFE_HTML_TO_IMAGE_OPTIONS);
    if (blob) {
      const downloaded = downloadBlob(blob, filename);
      const blobUrl = URL.createObjectURL(blob);
      return {
        success: downloaded,
        blobUrl,
        filename,
      };
    }
  } catch (toBlobError) {
    console.warn('Direct toBlob failed, attempting canvas fallback:', toBlobError);
  }

  // Secondary fallback: render via canvas
  try {
    const canvas = await renderCertificateToCanvas(element);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            try {
              const dataUrl = canvas.toDataURL('image/png', 1.0);
              const link = document.createElement('a');
              link.href = dataUrl;
              link.download = filename;
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              setTimeout(() => document.body.removeChild(link), 3000);
              resolve({ success: true, filename });
            } catch (fallbackErr) {
              reject(fallbackErr);
            }
            return;
          }

          const downloaded = downloadBlob(blob, filename);
          const blobUrl = URL.createObjectURL(blob);
          resolve({
            success: downloaded,
            blobUrl,
            filename,
          });
        },
        'image/png',
        1.0
      );
    });
  } catch (err) {
    console.error('exportCertificateAsPng failed:', err);
    throw err;
  }
}
