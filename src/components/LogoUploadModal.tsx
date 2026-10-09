import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  Copy,
  X,
  FileCode,
  FolderOpen,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoUpdated: (newLogoUrl: string | null) => void;
  currentLogoUrl?: string | null;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  onLogoUpdated,
  currentLogoUrl,
}) => {
  const [copiedRoute, setCopiedRoute] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const publicRoute = '/Tamilnadu-Government-Color.png';
  const localFilePath = 'public/Tamilnadu-Government-Color.png';

  const handleCopyRoute = () => {
    navigator.clipboard.writeText(publicRoute);
    setCopiedRoute(true);
    setTimeout(() => setCopiedRoute(false), 2000);
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(localFilePath);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      try {
        localStorage.setItem('tn_gov_logo', result);
      } catch {
        // ignore
      }
      onLogoUpdated(result);
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    try {
      localStorage.removeItem('tn_gov_logo');
    } catch {
      // ignore
    }
    setPreviewUrl(null);
    setFileName(null);
    onLogoUpdated(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden text-slate-900">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between bg-gradient-to-r from-teal-50 via-white to-amber-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#009387] text-white flex items-center justify-center shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Certificate Logo Configuration
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Tamil Nadu Government Color Logo Route & Upload
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Exact File Route Information */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                <FolderOpen className="w-4 h-4 text-amber-700" />
                <span>Target Project Route & File Location</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                Automatic Detection
              </span>
            </div>

            <p className="text-xs text-amber-950 leading-relaxed font-normal">
              To place the image in the project repository so the web server serves it directly, upload or save your file at:
            </p>

            {/* Path Box 1 */}
            <div className="flex items-center justify-between bg-white rounded-xl px-3.5 py-2.5 border border-amber-200 shadow-2xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Project File Path:
                </span>
                <code className="text-xs font-mono font-bold text-teal-900 select-all">
                  {localFilePath}
                </code>
              </div>
              <button
                type="button"
                onClick={handleCopyPath}
                className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copiedPath ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Path Box 2 */}
            <div className="flex items-center justify-between bg-white rounded-xl px-3.5 py-2.5 border border-amber-200 shadow-2xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Browser Web Route URL:
                </span>
                <code className="text-xs font-mono font-bold text-teal-900 select-all">
                  {publicRoute}
                </code>
              </div>
              <button
                type="button"
                onClick={handleCopyRoute}
                className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copiedRoute ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-amber-900/80">
              Supported formats: <strong className="font-semibold">.png</strong>, <strong className="font-semibold">.jpg</strong>, <strong className="font-semibold">.jpeg</strong>, <strong className="font-semibold">.svg</strong>, or <strong className="font-semibold">.webp</strong>.
            </p>
          </div>

          {/* Section 2: Direct In-Browser Upload */}
          <div className="rounded-2xl bg-teal-50/50 border border-teal-200/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center space-x-1.5">
                <Upload className="w-4 h-4 text-[#009387]" />
                <span>Upload Logo File Directly Now</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-200/80 text-teal-900">
                Instant Preview
              </span>
            </div>

            <p className="text-xs text-teal-950/80">
              Select your <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-teal-900">Tamilnadu-Government-Color</code> image file from your computer. It applies instantly to the certificate and saves in your browser:
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="input-logo-file"
            />

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#009387] hover:bg-[#008276] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Tamilnadu-Government-Color Image...</span>
              </button>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Vector Emblem</span>
                </button>
              )}
            </div>

            {/* Live Preview Box */}
            {previewUrl && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-teal-200 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                  <img
                    src={previewUrl}
                    alt="Uploaded Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {fileName || 'Custom Logo Active'}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied to Certificate</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
