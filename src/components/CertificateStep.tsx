import React, { useState, useRef, useEffect } from 'react';
import { UserSession, BorderStyle, ModuleItem } from '../types';
import { GovernmentLogo } from './GovernmentLogo';
import { LogoUploadModal } from './LogoUploadModal';
import {
  Award,
  Download,
  Printer,
  Copy,
  Check,
  Edit3,
  MessageSquare,
  LogOut,
  Sparkles,
  QrCode,
  ShieldCheck,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface CertificateStepProps {
  session: UserSession;
  modules: ModuleItem[];
  onEditDetails: () => void;
  onExitSession: () => void;
  onOpenFeedback: () => void;
}

export const CertificateStep: React.FC<CertificateStepProps> = ({
  session,
  modules,
  onEditDetails,
  onExitSession,
  onOpenFeedback,
}) => {
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('royal-gold');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('tn_gov_logo');
    } catch {
      return null;
    }
  });
  const certificateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Trigger celebratory confetti on initial load of certificate
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

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.certificateRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `AI_Workshop_Certificate_${session.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = () => {
    // Opens print dialog which provides native high-quality Save as PDF with our custom print styling!
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  // Border theme classes
  const getBorderClasses = () => {
    switch (borderStyle) {
      case 'emerald':
        return {
          outer: 'border-[#059669]',
          inner: 'border-[#10b981]/50',
          accent: '#059669',
          bg: 'bg-white',
        };
      case 'platinum':
        return {
          outer: 'border-slate-700',
          inner: 'border-slate-400/50',
          accent: '#334155',
          bg: 'bg-white',
        };
      case 'vintage-bronze':
        return {
          outer: 'border-[#92400e]',
          inner: 'border-[#b45309]/50',
          accent: '#b45309',
          bg: 'bg-[#fffdf7]',
        };
      case 'royal-gold':
      default:
        return {
          outer: 'border-[#b45309]',
          inner: 'border-[#d97706]/60',
          accent: '#b45309',
          bg: 'bg-[#fffefb]',
        };
    }
  };

  const borderTheme = getBorderClasses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Top Control Bar Card in ultra-light frosted glass */}
      <div className="backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] rounded-3xl p-5 sm:p-6 mb-8 print:hidden relative overflow-hidden text-slate-900">
        {/* Subtle glass reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 relative z-10">
          {/* Left: Certificate info and badge */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#009387] text-white flex items-center justify-center shadow-md shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
                  Official AI Workshop Certificate
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/25 text-emerald-950 border border-emerald-300/80 shadow-2xs">
                  Verified Credential
                </span>
              </div>
              <p className="text-xs text-slate-800 mt-0.5 font-mono font-medium">
                Certificate Ref: <strong className="text-slate-950 font-bold">{session.certificateRef}</strong>
              </p>
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Border Selector Dropdown */}
            <div className="relative">
              <select
                id="select-certificate-border"
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value as BorderStyle)}
                className="pl-3 pr-8 py-2 bg-white/50 hover:bg-white/75 border border-white/70 rounded-xl text-xs font-bold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer appearance-none transition-colors backdrop-blur-md"
              >
                <option value="royal-gold">Border: 👑 Ornate Royal Gold</option>
                <option value="emerald">Border: 🌿 Classic Emerald</option>
                <option value="platinum">Border: 🏛️ Executive Platinum</option>
                <option value="vintage-bronze">Border: 📜 Vintage Bronze</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Copy ID */}
            <button
              id="btn-copy-certificate-id"
              onClick={handleCopyId}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white/50 hover:bg-white/75 border border-white/70 text-slate-800 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
              title="Copy Certificate Reference ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-800">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-700" />
                  <span>Copy ID</span>
                </>
              )}
            </button>

            {/* Edit Details */}
            <button
              id="btn-edit-certificate-details"
              onClick={onEditDetails}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white/50 hover:bg-white/75 border border-white/70 text-slate-800 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-700" />
              <span>Edit Details</span>
            </button>

            {/* Logo Settings / Upload */}
            <button
              id="btn-upload-logo-cert"
              onClick={() => setIsLogoModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/70 text-amber-950 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
              title="Upload Tamilnadu-Government-Color Logo"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>Tamilnadu-Government-Color Logo</span>
            </button>

            {/* Feedback Form */}
            <button
              id="btn-feedback-form"
              onClick={onOpenFeedback}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-300/60 text-purple-950 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
              <span>Feedback Form ↗</span>
            </button>

            {/* Download PDF */}
            <button
              id="btn-download-certificate-pdf"
              onClick={handleDownloadPdf}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#009387] hover:bg-[#008276] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-teal-900/30 active:scale-[0.99] transition-all cursor-pointer border border-teal-300/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Certificate (PDF)</span>
            </button>

            {/* Download PNG */}
            <button
              id="btn-download-certificate-png"
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white/50 hover:bg-white/75 border border-white/70 text-slate-800 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
            >
              <ImageIcon className="w-3.5 h-3.5 text-slate-700" />
              <span>{isExporting ? 'Exporting...' : 'PNG'}</span>
            </button>

            {/* Print */}
            <button
              id="btn-print-certificate"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white/50 hover:bg-white/75 border border-white/70 text-slate-800 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer backdrop-blur-md"
            >
              <Printer className="w-3.5 h-3.5 text-slate-700" />
              <span>Print</span>
            </button>

            {/* Exit Session */}
            <button
              id="btn-exit-session"
              onClick={onExitSession}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-slate-800 hover:text-red-700 hover:bg-red-100/50 rounded-xl text-xs font-bold transition-colors cursor-pointer backdrop-blur-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Official Verified Certificate matching Image 5 */}
      <div className="flex justify-center overflow-x-auto pb-8">
        <div
          ref={certificateRef}
          id="official-certificate-container"
          className={`w-[1024px] min-w-[1024px] ${borderTheme.bg} rounded-xl shadow-2xl p-9 relative select-none border-8 ${borderTheme.outer} text-slate-900 overflow-hidden print:w-full print:min-w-0 print:shadow-none print:border-8 print:m-0`}
        >
          {/* Inner Double Gold Border */}
          <div
            className={`w-full h-full border-2 ${borderTheme.inner} p-7 relative rounded-sm flex flex-col justify-between`}
            style={{
              backgroundImage:
                'radial-gradient(ellipse at center, rgba(254, 243, 199, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          >
            {/* Ornate Corner Flourishes in all 4 corners matching Image 5 */}
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

            {/* Top Section: Emblem, Title & Certify */}
            <div className="text-center pt-2">
              {/* Tamil Nadu State Government Color Logo */}
              <div className="flex flex-col items-center justify-center mb-3">
                <GovernmentLogo
                  size={88}
                  customLogoUrl={customLogoUrl}
                  onOpenUploadModal={() => setIsLogoModalOpen(true)}
                />
              </div>

              {/* Sub-header */}
              <p
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-xs font-bold text-amber-900 tracking-[0.25em] uppercase mb-1"
              >
                AI WORKSHOP PROGRAM
              </p>

              {/* Main Heading matching Image 5 */}
              <h1
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wider uppercase mb-1 drop-shadow-2xs"
              >
                CERTIFICATE OF COMPLETION
              </h1>

              {/* Official Verification Subtitle */}
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-800/80 mb-4">
                OFFICIAL VERIFIED CERTIFICATION
              </p>

              {/* "This is to certify that" */}
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-base sm:text-lg italic text-slate-700 font-medium mb-3"
              >
                This is to certify that
              </p>

              {/* Recipient Full Name */}
              <div className="inline-block relative my-1">
                <h2
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight px-8"
                >
                  {session.name || 'Participant Name'}
                </h2>
                {/* Decorative Gold Bar under Name */}
                <div className="flex items-center justify-center mt-2">
                  <div className="h-0.5 w-36 bg-gradient-to-r from-transparent via-amber-500 to-amber-700" />
                  <div className="w-2.5 h-2.5 rotate-45 bg-amber-600 mx-2 shadow-xs" />
                  <div className="h-0.5 w-36 bg-gradient-to-l from-transparent via-amber-500 to-amber-700" />
                </div>
              </div>

              {/* Designation • Department */}
              <p className="text-sm sm:text-base font-semibold text-slate-800 tracking-wide mt-2">
                <span className="font-bold text-slate-900">
                  {session.designation || 'Assistant Section Officer'}
                </span>
                <span className="mx-2 text-amber-600 font-bold">•</span>
                <span>
                  {session.department || 'District Administration, Thoothukudi'}
                </span>
              </p>

              {/* Descriptive Paragraph matching Image 5 */}
              <p className="text-xs text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed font-normal">
                has successfully compiled, submitted, and completed all {modules.length} core statutory and technical modules.
                All submissions and practical exercises have been verified with complete technical compliance:
              </p>
            </div>

            {/* Verified Module Tags Grid matching Image 5 */}
            <div className="my-5 px-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
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

            {/* Bottom Row: Authorized Sole Signatory (Thiru. Vishu Mahajan), Official Gold Seal, QR Code */}
            <div className="pt-4 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end text-center mt-2">
              {/* Left Column: Official Verification & Security Details */}
              <div className="hidden md:flex flex-col items-center sm:items-start text-left pl-4">
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

              {/* Center Seal */}
              <div className="flex flex-col items-center justify-center order-first sm:order-none">
                {/* Official Embossed Gold Seal with Ribbons */}
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-2 border-amber-700 flex items-center justify-center shadow-md">
                    <div className="w-13 h-13 rounded-full border border-dashed border-amber-900 flex flex-col items-center justify-center text-center p-1 bg-amber-500/20">
                      <ShieldCheck className="w-5 h-5 text-amber-900" />
                      <span className="text-[7px] font-extrabold tracking-tighter text-amber-950 uppercase leading-none mt-0.5">
                        OFFICIAL SEAL
                      </span>
                    </div>
                  </div>
                  {/* Ribbon tails */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
                    <div className="w-3 h-5 bg-amber-700 -rotate-12 rounded-b-xs shadow-xs" />
                    <div className="w-3 h-5 bg-amber-800 rotate-12 rounded-b-xs shadow-xs" />
                  </div>
                </div>

                <div className="md:hidden flex items-center space-x-1.5 mt-1 text-[9px] text-slate-600">
                  <QrCode className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-mono text-[9px]">{session.verificationHash}</span>
                </div>
              </div>

              {/* Right Column: Authorized Signatory - Thiru. Vishu Mahajan (Only his name, no other signatories) */}
              <div className="flex flex-col items-center pr-2">
                <div
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-2xl sm:text-3xl text-slate-900 h-10 flex items-center select-none"
                >
                  Thiru. Vishu Mahajan
                </div>
                <div className="w-48 h-0.5 bg-slate-400 my-1.5" />
                <p className="text-[12px] font-bold text-slate-900 tracking-tight">
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

      {/* Tamil Nadu Government Color Logo Upload & Route Modal */}
      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        onLogoUpdated={(newLogo) => setCustomLogoUrl(newLogo)}
        currentLogoUrl={customLogoUrl}
      />
    </div>
  );
};
