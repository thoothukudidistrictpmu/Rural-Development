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
  ShieldCheck,
} from 'lucide-react';

interface SealUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSealUpdated: (newSealUrl: string | null) => void;
  currentSealUrl?: string | null;
}

export const SealUploadModal: React.FC<SealUploadModalProps> = ({
  isOpen,
  onClose,
  onSealUpdated,
  currentSealUrl,
}) => {
  const [copiedRoute, setCopiedRoute] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentSealUrl || '/official-seal.png');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const publicRoute = '/official-seal.png';
  const localFilePath = 'public/official-seal.png';

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
        localStorage.setItem('official_seal_image', result);
      } catch {
        // ignore
      }
      onSealUpdated(result);
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    try {
      localStorage.removeItem('official_seal_image');
    } catch {
      // ignore
    }
    setPreviewUrl('/official-seal.png');
    setFileName(null);
    onSealUpdated('/official-seal.png');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/60 p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-700 flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Official Workshop Seal
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Verified Circular Red Seal for Certificate Authenticity
            </p>
          </div>
        </div>

        {/* Current Active Seal Preview */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-5 flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Seal Preview"
                className="max-h-full max-w-full object-contain rounded-full"
              />
            ) : (
              <ShieldCheck className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900 truncate">
                {fileName || 'official-seal.png'}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Active on Certificate
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              AI Workshop Program Official Seal
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-red-300 hover:border-red-500 bg-red-50/40 hover:bg-red-50/70 transition-all rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800 group-hover:text-red-900">
              Click to upload a new seal image
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports PNG, JPG, SVG, WebP (Transparent PNG recommended)
            </p>
          </button>
        </div>

        {/* Quick Reset & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default Seal</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
