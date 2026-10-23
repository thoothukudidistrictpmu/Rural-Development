export interface UserSession {
  name: string;
  email: string;
  designation: string;
  department: string;
  certificateRef: string;
  issueDate: string;
  verificationHash: string;
}

export interface UploadedFileInfo {
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
}

export interface ReferenceMaterial {
  title: string;
  filename: string;
  format: 'DOCX' | 'PDF' | 'PPTX' | 'XLSX' | 'TXT';
  size?: string;
  url?: string;
  driveUrl?: string;
  contentSnippet?: string;
}

export interface ModuleItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  acceptedFormats: string[];
  referenceMaterials?: ReferenceMaterial[];
  driveFolderUrl?: string;
  status: 'pending' | 'submitted';
  uploadedFile: UploadedFileInfo | null;
  promptGuide?: string;
}

export interface FinalSubmissionState {
  status: 'pending' | 'submitted';
  uploadedFile: UploadedFileInfo | null;
}

export type BorderStyle = 'royal-gold' | 'emerald' | 'platinum' | 'vintage-bronze';

export type PortalStep = 1 | 2 | 3 | 4 | 5;
