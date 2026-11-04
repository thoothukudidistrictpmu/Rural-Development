import React, { useState, useRef, useEffect } from 'react';
import { UserSession, ModuleItem } from '../types';
import { GovernmentLogo } from './GovernmentLogo';
import { OfficialSeal } from './OfficialSeal';
import {
  Award,
  Download,
  Edit3,
  MessageSquare,
  QrCode,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportCertificateAsPdf } from '../utils/certificateExport';

interface CertificateStepProps {
  session: UserSession;
  modules: ModuleItem[];
  onEditDetails: () => void;
  onExitSession?: () => void;
  onOpenFeedback: () => void;
}

export const CertificateStep: React.FC<CertificateStepProps> = ({
  session,
  modules,
  onEditDetails,
  onOpenFeedback,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    manualUrl?: string;
    filename?: string;
  } | null>(null);

  const certificateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Celebratory confetti on initial load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadPdf = async () => {
    if (!certificateRef.current || isExporting) return;
    setDownloadStatus(null);
    setIsExporting(true);

    try {
      const result = await exportCertificateAsPdf(certificateRef.current, session.name);
      setDownloadStatus({
        type: 'success',
        message: 'Certificate PDF successfully downloaded to your device!',
        manualUrl: result.blobUrl,
        filename: result.filename,
      });
    } catch (err) {
      console.error('Failed to download PDF:', err);
      setDownloadStatus({
        type: 'error',
        message: 'PDF generation encountered a browser issue. Please try clicking the button again.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
      {/* Download Alert / Notification Banner if active */}
      {downloadStatus && (
        <div
          className={`mb-6 p-4 rounded-2xl border backdrop-blur-md shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            downloadStatus.type === 'success'
              ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-950'
              : 'bg-amber-500/20 border-amber-400/60 text-amber-950'
          }`}
        >
          <div className="flex items-center space-x-3">
            {downloadStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            )}
            <div>
              <p className="text-xs sm:text-sm font-bold">{downloadStatus.message}</p>
              {downloadStatus.manualUrl && (
                <p className="text-[11px] font-medium text-slate-700 mt-0.5">
                  If your download did not start automatically:{' '}
                  <a
                    href={downloadStatus.manualUrl}
                    download={downloadStatus.filename || 'AI_Workshop_Certificate.pdf'}
                    className="font-extrabold underline text-teal-900 hover:text-teal-950 ml-1 inline-flex items-center"
                  >
                    Click here to save file <Download className="w-3 h-3 ml-0.5" />
                  </a>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setDownloadStatus(null)}
            className="text-xs font-bold px-3 py-1 bg-white/60 hover:bg-white rounded-lg border border-black/10 transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Action Bar: STRICTLY ONLY 3 CONTROLS: Download Certificate (PDF), Feedback, Edit Details */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-3xl p-4 sm:p-5 mb-8 print:hidden relative overflow-hidden text-slate-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          {/* Certificate Badge & Reference */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-[#009387] text-white flex items-center justify-center shadow-md shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Certificate of Completion
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-950 border border-emerald-400/50">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-700 font-mono font-medium">
                Ref: <strong className="text-slate-950 font-bold">{session.certificateRef}</strong>
              </p>
            </div>
          </div>

          {/* Action Toolbar: Download Certificate (PDF), Feedback, Edit Details ONLY */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            {/* 1. Edit Details */}
            <button
              id="btn-edit-details"
              onClick={onEditDetails}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/60 hover:bg-white border border-white/80 text-slate-800 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer backdrop-blur-md active:scale-[0.98]"
              title="Edit participant name, designation, or department"
            >
              <Edit3 className="w-4 h-4 text-slate-700" />
              <span>Edit Details</span>
            </button>

            {/* 2. Feedback - Directly opens official Google Feedback Form */}
            <a
              id="btn-feedback"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeT0bBfGqkgmNOb8tUylUunhqOO-ebdmOt2BnVppsuaxRsswg/viewform?usp=sharing&ouid=113094465631862000503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-300/70 text-purple-950 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer backdrop-blur-md active:scale-[0.98]"
              title="Open official Google Feedback Form"
            >
              <MessageSquare className="w-4 h-4 text-purple-700" />
              <span>Feedback ↗</span>
            </a>

            {/* 3. Download Certificate (PDF) */}
            <button
              id="btn-download-certificate-pdf"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#009387] hover:bg-[#008276] disabled:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-teal-900/30 transition-all cursor-pointer border border-teal-300/40 active:scale-[0.98]"
              title="Download official PDF certificate to your computer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Certificate (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Official Certificate Card - Immune to font and layout collapse */}
      <div className="flex justify-center overflow-x-auto pb-8">
        <div
          ref={certificateRef}
          id="official-certificate-container"
          style={{
            width: '1024px',
            minWidth: '1024px',
            backgroundColor: '#fffefb',
            boxSizing: 'border-box',
          }}
          className="rounded-xl shadow-2xl p-8 relative select-none border-8 border-[#b45309] text-slate-900 overflow-hidden print:w-full print:min-w-0 print:shadow-none print:border-8 print:m-0"
        >
          {/* Inner Double Gold Border */}
          <div
            className="w-full h-full border-2 border-[#d97706]/70 p-6 relative rounded-xs flex flex-col justify-between"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at center, rgba(254, 243, 199, 0.22) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          >
            {/* Ornate Gold Corner Flourishes */}
            {/* Top-Left Corner */}
            <div className="absolute top-2 left-2 w-14 h-14 pointer-events-none">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                <path d="M0 0 L60 0 L60 8 L12 8 L12 60 L0 60 Z" fill="#b45309" />
                <path d="M16 16 L45 16 L45 20 L20 20 L20 45 L16 45 Z" fill="#d97706" />
                <circle cx="8" cy="8" r="3" fill="#f59e0b" />
                <circle cx="28" cy="8" r="2" fill="#d97706" />
                <circle cx="8" cy="28" r="2" fill="#d97706" />
                <polygon points="25,25 35,20 30,30" fill="#f59e0b" />
              </svg>
            </div>

            {/* Top-Right Corner */}
            <div className="absolute top-2 right-2 w-14 h-14 pointer-events-none rotate-90">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                <path d="M0 0 L60 0 L60 8 L12 8 L12 60 L0 60 Z" fill="#b45309" />
                <path d="M16 16 L45 16 L45 20 L20 20 L20 45 L16 45 Z" fill="#d97706" />
                <circle cx="8" cy="8" r="3" fill="#f59e0b" />
                <circle cx="28" cy="8" r="2" fill="#d97706" />
                <circle cx="8" cy="28" r="2" fill="#d97706" />
                <polygon points="25,25 35,20 30,30" fill="#f59e0b" />
              </svg>
            </div>

            {/* Bottom-Left Corner */}
            <div className="absolute bottom-2 left-2 w-14 h-14 pointer-events-none -rotate-90">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                <path d="M0 0 L60 0 L60 8 L12 8 L12 60 L0 60 Z" fill="#b45309" />
                <path d="M16 16 L45 16 L45 20 L20 20 L20 45 L16 45 Z" fill="#d97706" />
                <circle cx="8" cy="8" r="3" fill="#f59e0b" />
                <circle cx="28" cy="8" r="2" fill="#d97706" />
                <circle cx="8" cy="28" r="2" fill="#d97706" />
                <polygon points="25,25 35,20 30,30" fill="#f59e0b" />
              </svg>
            </div>

            {/* Bottom-Right Corner */}
            <div className="absolute bottom-2 right-2 w-14 h-14 pointer-events-none rotate-180">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                <path d="M0 0 L60 0 L60 8 L12 8 L12 60 L0 60 Z" fill="#b45309" />
                <path d="M16 16 L45 16 L45 20 L20 20 L20 45 L16 45 Z" fill="#d97706" />
                <circle cx="8" cy="8" r="3" fill="#f59e0b" />
                <circle cx="28" cy="8" r="2" fill="#d97706" />
                <circle cx="8" cy="28" r="2" fill="#d97706" />
                <polygon points="25,25 35,20 30,30" fill="#f59e0b" />
              </svg>
            </div>

            {/* Top Header Section */}
            <div className="text-center pt-2">
              {/* Crisp Tamil Nadu State Government Emblem Logo */}
              <div className="flex flex-col items-center justify-center mb-2.5">
                <GovernmentLogo size={88} />
              </div>

              {/* Sub-header */}
              <p
                style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
                className="text-xs font-bold text-amber-900 tracking-[0.25em] uppercase mb-1"
              >
                AI WORKSHOP PROGRAM
              </p>

              {/* Main Heading */}
              <h1
                style={{ fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif" }}
                className="text-3xl font-extrabold text-slate-900 tracking-wider uppercase mb-1 drop-shadow-2xs leading-tight"
              >
                CERTIFICATE OF COMPLETION
              </h1>

              {/* Official Verification Subtitle */}
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-800/90 mb-3">
                OFFICIAL VERIFIED CERTIFICATION
              </p>

              {/* "This is to certify that" */}
              <p
                style={{ fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif" }}
                className="text-base italic text-slate-700 font-medium mb-1"
              >
                This is to certify that
              </p>

              {/* Participant Name Section - Generous line-height and margin, NO overlap */}
              <div className="w-full max-w-3xl mx-auto my-2 px-4 text-center">
                <h2
                  style={{
                    fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
                    lineHeight: '1.25',
                  }}
                  className="text-3xl font-bold text-slate-950 tracking-normal text-center break-words select-text"
                >
                  {session.name || 'Participant Name'}
                </h2>

                {/* Elegant Gold Accent Divider placed cleanly below the name in standard document flow */}
                <div className="flex items-center justify-center mt-3 mb-2" aria-hidden="true">
                  <div className="h-[2px] w-36 bg-gradient-to-r from-transparent via-amber-500 to-amber-700" />
                  <div className="w-2.5 h-2.5 rotate-45 bg-amber-600 mx-2.5 shadow-2xs shrink-0" />
                  <div className="h-[2px] w-36 bg-gradient-to-l from-transparent via-amber-500 to-amber-700" />
                </div>
              </div>

              {/* Designation • Department */}
              <p className="text-sm font-semibold text-slate-800 tracking-wide mt-1 mb-2">
                <span className="font-bold text-slate-900">
                  {session.designation || 'Assistant Section Officer'}
                </span>
                <span className="mx-2 text-amber-600 font-bold">•</span>
                <span>
                  {session.department || 'District Administration, Thoothukudi'}
                </span>
              </p>

              {/* Verification Statement */}
              <p className="text-xs text-slate-600 max-w-3xl mx-auto mt-2 mb-2 leading-relaxed font-normal">
                has successfully compiled, submitted, and completed all {modules.length} core statutory and technical modules.
                All submissions and practical exercises have been verified with complete technical compliance:
              </p>
            </div>

            {/* Verified Module Tags Grid - Always 4 Columns (3 rows of 4 = 12 modules) */}
            <div className="my-3 px-4">
              <div className="grid grid-cols-4 gap-2 text-left">
                {modules.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between bg-amber-50/70 border border-amber-200/80 rounded-lg px-2.5 py-1 text-[10px]"
                  >
                    <div className="flex items-center space-x-1.5 overflow-hidden pr-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate" title={m.title}>
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-extrabold text-blue-700 shrink-0 uppercase tracking-tighter">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row - Always 3 Columns: Authority Details, Official Seal, Signatory */}
            <div className="pt-3 border-t border-amber-200/60 grid grid-cols-3 gap-4 items-end text-center mt-2">
              {/* Column 1 (Left): Official Authority Details & Verification Hash */}
              <div className="flex flex-col items-start text-left pl-4">
                <p className="text-[10px] font-bold tracking-wider text-slate-800 uppercase">
                  Government of Tamil Nadu
                </p>
                <p className="text-[9px] text-slate-600 mt-0.5">
                  District Administration, Thoothukudi
                </p>
                <div className="flex items-center space-x-1.5 mt-2 text-[9px] text-slate-600">
                  <QrCode className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span className="font-mono text-[9px]">{session.verificationHash}</span>
                </div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Issued: {session.issueDate}
                </p>
              </div>

              {/* Column 2 (Center): Official Red AI Workshop Seal */}
              <div className="flex flex-col items-center justify-center">
                <OfficialSeal size={82} />
              </div>

              {/* Column 3 (Right): Authorized Sole Signatory - Thiru. Vishu Mahajan */}
              <div className="flex flex-col items-center pr-4">
                <div
                  style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
                  className="text-2xl text-slate-900 h-9 flex items-center justify-center select-none"
                >
                  Thiru. Vishu Mahajan
                </div>
                <div className="w-48 h-0.5 bg-slate-400 my-1 mx-auto" />
                <p className="text-[11px] font-bold text-slate-900 tracking-tight">
                  Thiru. Vishu Mahajan
                </p>
                <p className="text-[10px] text-slate-700 font-medium">
                  District Collector & District Magistrate
                </p>
                <p className="text-[9px] text-slate-500">
                  Thoothukudi District
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
