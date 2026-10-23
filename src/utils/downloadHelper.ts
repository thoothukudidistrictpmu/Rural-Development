import { ReferenceMaterial } from '../types';

/**
 * Downloads either a remote file URL or dynamically generates a downloadable file
 * containing the official reference text / dossier template.
 */
export async function downloadReferenceMaterial(moduleCode: string, material: ReferenceMaterial) {
  if (material.url) {
    // 1. Direct local file (hosted in public directory)
    if (!material.url.startsWith('http://') && !material.url.startsWith('https://')) {
      try {
        const response = await fetch(material.url);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        // Assign accurate MIME type based on file extension
        let mimeType = 'application/octet-stream';
        if (material.filename.endsWith('.docx')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else if (material.filename.endsWith('.pdf')) {
          mimeType = 'application/pdf';
        } else if (material.filename.endsWith('.pptx')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        } else if (material.filename.endsWith('.xlsx')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        }

        const blob = new Blob([arrayBuffer], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = material.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
        return;
      } catch (err) {
        console.warn('Blob fetch failed, falling back to direct anchor download', err);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = material.url;
        a.download = material.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
    }

    // 2. Remote URL: Trigger standard browser download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = material.url;
    a.download = material.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // Generate downloadable reference document blob
  const textContent = `${moduleCode} - REFERENCE WORKSHOP MATERIAL
Title: ${material.title}
File: ${material.filename}
Format: ${material.format}
Generated: ${new Date().toLocaleDateString()}

============================================================
GOVERNMENT OF TAMIL NADU - DISTRICT ADMINISTRATION
AI CAPACITY BUILDING WORKSHOP REFERENCE DOSSIER
============================================================

EXERCISE CONTEXT & SOURCE MATERIAL:
${material.contentSnippet || 'Standard departmental source dossier and reference parameters for this administrative exercise.'}

INSTRUCTIONS FOR PARTICIPANT:
1. Review the key clauses, statistics, and administrative directives above.
2. Formulate your AI prompt using the official workshop prompt template.
3. Process the file in your AI workspace (Gemini / Assistant).
4. Save your final output as a DOCX/PDF and upload it to the submission portal.

============================================================
Verified District AI Capacity Building Portal
`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = material.filename.endsWith('.txt') ? material.filename : `${material.filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
