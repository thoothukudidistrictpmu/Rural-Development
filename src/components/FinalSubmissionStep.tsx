import React, { useRef } from 'react';
import { FinalSubmissionState } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  FileText,
  FileCode,
  Presentation,
  CheckCircle2,
  X,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface FinalSubmissionStepProps {
  finalSubmission: FinalSubmissionState;
  onUploadFinalFile: (file: File) => void;
  onRemoveFinalFile: () => void;
  onBackToModules: () => void;
  onProceedToProfile: () => void;
  onAutoUploadDemoFinal: () => void;
}

export const FinalSubmissionStep: React.FC<FinalSubmissionStepProps> = ({
  finalSubmission,
  onUploadFinalFile,
  onRemoveFinalFile,
  onBackToModules,
  onProceedToProfile,
  onAutoUploadDemoFinal,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isUploaded = finalSubmission.status === 'submitted' && !!finalSubmission.uploadedFile;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFinalFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUploadFinalFile(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Top Navigation Row matching Image 3 */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-back-to-modules"
          onClick={onBackToModules}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/40 backdrop-blur-md hover:bg-white/60 text-slate-800 text-xs font-bold rounded-full border border-white/60 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Modules</span>
        </button>

        <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#009387] text-white text-xs font-bold rounded-full shadow-2xs">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Final Module Submission</span>
        </span>
      </div>

      {/* Main Container in ultra-light frosted glass */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] rounded-3xl overflow-hidden relative text-slate-900"
      >
        {/* Subtle glass reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

        {/* Top Cyan Accent Line */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] relative z-10" />

        <div className="p-6 sm:p-10 relative z-10">
          {/* Badges Row */}
          <div className="flex items-center justify-between mb-5">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#009387] text-white shadow-2xs">
              Final Module
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs shadow-2xs ${
                isUploaded
                  ? 'bg-emerald-500/25 text-emerald-950 border-emerald-300/80'
                  : 'bg-white/60 text-[#00796b] border-white/80'
              }`}
            >
              {isUploaded ? '✓ Final Upload Complete' : 'Final Upload Pending'}
            </span>
          </div>

          {/* Heading and Description */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
              Final Submission
            </h2>
            <p className="text-sm font-semibold text-slate-800 mt-2 max-w-3xl leading-relaxed drop-shadow-2xs">
              Upload your completed document (Word, PDF, or PowerPoint) below. Once submitted, you can
              proceed directly to enter your profile details for certificate issuance.
            </p>
          </div>

          {/* Accepted Formats Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-white/40">
            <span className="text-xs text-slate-800 font-bold mr-1">Accepted Formats:</span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/50 text-blue-900 border border-white/70 rounded-full text-xs font-bold backdrop-blur-xs shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Word (.docx, .doc)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/50 text-red-900 border border-white/70 rounded-full text-xs font-bold backdrop-blur-xs shadow-2xs">
              <FileCode className="w-3.5 h-3.5 text-red-600" />
              <span>PDF (.pdf)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/50 text-amber-950 border border-white/70 rounded-full text-xs font-bold backdrop-blur-xs shadow-2xs">
              <Presentation className="w-3.5 h-3.5 text-amber-700" />
              <span>PowerPoint (.pptx, .ppt)</span>
            </span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".docx,.doc,.pdf,.pptx,.ppt"
            className="hidden"
          />

          {/* Big Upload Dropzone in frosted glass */}
          {!isUploaded ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/70 hover:border-teal-400 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all group flex flex-col items-center justify-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-white/80 flex items-center justify-center text-[#00695c] group-hover:scale-105 group-hover:text-teal-600 group-hover:border-teal-300 transition-all">
                <UploadCloud className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#00695c] transition-colors drop-shadow-2xs">
                  Upload Document
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-1">
                  Drag and drop your file here, or click to browse from your device.
                </p>
              </div>

              {/* Format Pills inside Dropzone */}
              <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/60 text-blue-900 rounded-lg text-xs font-bold border border-white/70 shadow-2xs backdrop-blur-xs">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Word (.docx, .doc)</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/60 text-red-900 rounded-lg text-xs font-bold border border-white/70 shadow-2xs backdrop-blur-xs">
                  <FileCode className="w-3.5 h-3.5 text-red-600" />
                  <span>PDF (.pdf)</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/60 text-amber-950 rounded-lg text-xs font-bold border border-white/70 shadow-2xs backdrop-blur-xs">
                  <Presentation className="w-3.5 h-3.5 text-amber-700" />
                  <span>PowerPoint (.pptx, .ppt)</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-300/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/30 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-300/80">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#009387] text-white mb-1 shadow-2xs">
                    Document Attached Successfully
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-950 truncate max-w-md">
                    {finalSubmission.uploadedFile?.name}
                  </h4>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    {finalSubmission.uploadedFile?.size} • Uploaded on {finalSubmission.uploadedFile?.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-white/60 hover:bg-white/80 border border-white/70 rounded-xl transition-colors cursor-pointer backdrop-blur-sm shadow-2xs"
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={onRemoveFinalFile}
                  className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-100/50 rounded-xl border border-transparent transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Upload Helper & Proceed Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/40">
            <div>
              {!isUploaded && (
                <button
                  type="button"
                  onClick={onAutoUploadDemoFinal}
                  className="inline-flex items-center space-x-1.5 text-xs text-[#00695c] hover:text-[#004d40] font-bold cursor-pointer bg-white/40 px-3 py-1.5 rounded-full border border-white/60 backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00897b]" />
                  <span>Auto-attach demo final module dossier (.docx)</span>
                </button>
              )}
            </div>

            <button
              id="btn-proceed-to-profile-details"
              disabled={!isUploaded}
              onClick={onProceedToProfile}
              className={`inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                isUploaded
                  ? 'bg-[#009387] hover:bg-[#008276] text-white shadow-md hover:shadow-teal-900/30 active:scale-[0.99] border border-teal-300/40'
                  : 'bg-white/30 text-slate-400 border border-white/40 cursor-not-allowed'
              }`}
            >
              <span>Proceed to Profile Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
