import { ReferenceMaterial } from '../types';

/**
 * Downloads either a remote file URL or dynamically generates a downloadable file
 * containing the official reference text / dossier template.
 */
export async function downloadReferenceMaterial(moduleCode: string, material: ReferenceMaterial) {
  if (material.url) {
    // 1. Direct Google Docs / Sheets / Slides export links OR direct drive file downloads (uc?export=download)
    // Directly launch standard browser download
    if (
      (material.url.includes('docs.google.com') && material.url.includes('/export')) ||
      (material.url.includes('drive.google.com') && material.url.includes('export=download'))
    ) {
      const a = document.createElement('a');
      a.href = material.url;
      a.download = material.filename;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // 2. Google Drive folder or viewer links - open in new tab
    if (material.url.startsWith('http') && material.url.includes('drive.google.com')) {
      window.open(material.url, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      // Fetch the actual file content to guarantee it downloads cleanly without browser navigation or HTML wrapping
      const response = await fetch(material.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = material.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      return;
    } catch (err) {
      console.warn('Direct blob fetch failed, falling back to window download', err);
      const a = document.createElement('a');
      a.href = material.url;
      a.download = material.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
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
