import React, { useState, useRef } from 'react';
import { ModuleItem } from '../types';
import {
  ExternalLink,
  ArrowRight,
  Upload,
  CheckCircle2,
  FileText,
  Clock,
  X,
  RefreshCw,
  Download,
  FolderOpen,
} from 'lucide-react';
import { motion } from 'motion/react';
import { downloadReferenceMaterial } from '../utils/downloadHelper';

interface ModulesStepProps {
  participantName: string;
  modules: ModuleItem[];
  onUploadModuleFile: (moduleId: string, file: File) => void;
  onRemoveModuleFile: (moduleId: string) => void;
  onProceedToProfile: () => void;
}

export const ModulesStep: React.FC<ModulesStepProps> = ({
  participantName,
  modules,
  onUploadModuleFile,
  onRemoveModuleFile,
  onProceedToProfile,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const submittedCount = modules.filter((m) => m.status === 'submitted').length;
  const totalCount = modules.length;
  const progressPercent = Math.round((submittedCount / totalCount) * 100);

  const filteredModules = modules.filter((m) => {
    if (filter === 'pending') return m.status === 'pending';
    if (filter === 'submitted') return m.status === 'submitted';
    return true;
  });

  const handleFileChange = (moduleId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadModuleFile(moduleId, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (moduleId: string, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUploadModuleFile(moduleId, file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Main White/Glass Container matching Image 2 */}
      <div className="backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] rounded-3xl overflow-hidden relative text-slate-900">
        {/* Subtle glass reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

        {/* Top Cyan Accent Line matching Image reference */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] relative z-10" />

        <div className="p-6 sm:p-8 relative z-10">
          {/* Header row with badges & action buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/40">
            {/* Left participant info */}
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#009387] text-white shadow-2xs">
                <FileText className="w-3.5 h-3.5" />
                <span>AI Workshop Submissions</span>
              </span>
              <span className="text-xs text-slate-800 font-semibold bg-white/50 border border-white/70 px-3 py-1 rounded-full backdrop-blur-md shadow-2xs">
                Participant: <strong className="text-slate-950 font-bold">{participantName || 'John Doe'}</strong>
              </span>
            </div>

            {/* Right Button: Prompt Area */}
            <div className="flex items-center space-x-3">
              <a
                id="link-prompt-sheet"
                href="https://docs.google.com/spreadsheets/d/1AuwuyE5cfhjTTSaiIws51td7pK7ucqA-eYiV2HY03wU/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#009387] hover:bg-[#008276] text-white text-xs font-bold rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                title="Open Official Prompt Area Google Sheet"
              >
                <span>Prompt Area</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Heading and Description */}
          <div className="mt-6 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
              Document Submission Grid
            </h2>
            <p className="text-sm font-semibold text-slate-800 mt-1.5 max-w-4xl drop-shadow-2xs">
              Upload your Word (.docx), PDF (.pdf), or PowerPoint (.pptx) files directly into each module. After
              submitting, move to the final submission module.
            </p>
          </div>

          {/* Submission Progress Bar in translucent frosted glass */}
          <div className="bg-white/35 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2.5">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-md bg-[#009387] text-white shadow-2xs">
                  <Upload className="w-3.5 h-3.5" />
                </span>
                <span>
                  Submission Progress: <strong className="text-[#00695c] font-extrabold">{submittedCount} of {totalCount} Modules Complete</strong>
                </span>
              </div>
              <span className="text-xs font-extrabold text-teal-950 bg-white/70 px-2.5 py-0.5 rounded-md border border-white/80 shadow-2xs">
                {progressPercent}%
              </span>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-slate-900/15 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Filter Tabs & Proceed Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Filter Pills in frosted glass */}
            <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 shadow-xs w-fit">
              <button
                id="filter-tab-all"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'all'
                    ? 'bg-[#009387] text-white shadow-xs'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                All Modules ({totalCount})
              </button>
              <button
                id="filter-tab-pending"
                onClick={() => setFilter('pending')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'pending'
                    ? 'bg-[#009387] text-white shadow-xs'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                Pending ({totalCount - submittedCount})
              </button>
              <button
                id="filter-tab-submitted"
                onClick={() => setFilter('submitted')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'submitted'
                    ? 'bg-[#009387] text-white shadow-xs'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                Submitted ({submittedCount})
              </button>
            </div>

            {/* Proceed to Profile Details Button */}
            <button
              id="btn-proceed-to-profile-details"
              onClick={onProceedToProfile}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#009387] hover:bg-[#008276] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-teal-900/30 active:scale-[0.99] transition-all cursor-pointer border border-teal-300/40"
            >
              <span>Proceed to Profile Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Module Cards Grid (3 Columns) in translucent frosted glass matching Image reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModules.map((module) => {
              const isSubmitted = module.status === 'submitted';

              return (
                <div
                  key={module.id}
                  id={`module-card-${module.code.toLowerCase()}`}
                  className={`rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative backdrop-blur-xl ${
                    isSubmitted
                      ? 'bg-white/30 border-emerald-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.25),0_0_25px_rgba(16,185,129,0.2)]'
                      : 'bg-white/25 sm:bg-white/30 hover:bg-white/35 border-white/50 hover:border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25),0_0_25px_rgba(6,182,212,0.15)]'
                  }`}
                >
                  {/* Top Cyan Accent Line matching Image 1 */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

                  {/* Surface reflection sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

                  <div className="p-5 relative z-10">
                    {/* Badges Row matching Image 1 */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#009387] text-white shadow-2xs">
                          {module.code}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-white/60 text-[#00695c] border border-white/70 shadow-2xs backdrop-blur-xs">
                          {module.tag}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-xs shadow-2xs ${
                          isSubmitted
                            ? 'bg-emerald-500/20 text-emerald-950 border-emerald-300/80'
                            : 'bg-white/60 text-[#00796b] border-white/80'
                        }`}
                      >
                        {isSubmitted ? '✓ Submitted' : 'Pending'}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug drop-shadow-2xs">
                      {module.title}
                    </h3>
                    <p className="text-xs font-bold text-[#00897b] mt-1 mb-2 drop-shadow-2xs">
                      {module.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-800 line-clamp-3 leading-relaxed mb-4 font-medium drop-shadow-2xs">
                      {module.description}
                    </p>

                    {/* Accepted Formats */}
                    <div className="flex items-center space-x-1 text-[11px] text-slate-800 mb-3 font-semibold">
                      <span className="text-slate-700">Accepted:</span>
                      {module.acceptedFormats.map((fmt) => (
                        <span
                          key={fmt}
                          className="px-1.5 py-0.5 bg-white/55 rounded-md text-slate-900 border border-white/70 text-[10px] font-bold shadow-2xs backdrop-blur-xs"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    {/* Relevant Reference Data / Exercise Files (Direct Document Download) */}
                    {module.referenceMaterials && module.referenceMaterials.length > 0 && (
                      <div className="mb-4 pt-1.5 border-t border-white/40">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-extrabold text-[#00695c] uppercase tracking-wider flex items-center">
                            <FolderOpen className="w-3.5 h-3.5 mr-1 text-[#00897b]" />
                            Official Reference Documents
                          </span>
                          <span className="text-[10px] text-[#00796b] font-bold">
                            Direct Document Download
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {module.referenceMaterials.map((mat, idx) => (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadReferenceMaterial(module.code, mat);
                              }}
                              className="group w-full flex items-center justify-between px-3 py-2 bg-white/70 hover:bg-white/95 border border-white/80 hover:border-teal-500 rounded-xl transition-all shadow-xs backdrop-blur-xs cursor-pointer"
                              title={`Download ${mat.filename}`}
                            >
                              <div className="flex items-center space-x-2.5 overflow-hidden pr-2 flex-1 text-left">
                                <span className="px-2 py-0.5 bg-[#009387] text-white rounded-md text-[9px] font-black shrink-0 shadow-2xs tracking-wide">
                                  {mat.format}
                                </span>
                                <div className="truncate">
                                  <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-900 truncate">
                                    {mat.title}
                                  </div>
                                  <div className="text-[9px] text-slate-500 font-medium truncate flex items-center space-x-1.5">
                                    <span>{mat.filename}</span>
                                    {mat.size && <span>• {mat.size}</span>}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadReferenceMaterial(module.code, mat);
                                }}
                                title={`Download ${mat.filename} (${mat.format})`}
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-[#009387] hover:bg-[#00796b] transition-all cursor-pointer shadow-xs shrink-0"
                              >
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload / Submission Area */}
                  <div className="px-5 pb-5 pt-0 relative z-10">
                    <input
                      type="file"
                      ref={(el) => {
                        fileInputRefs.current[module.id] = el;
                      }}
                      onChange={(e) => handleFileChange(module.id, e)}
                      accept=".docx,.pdf,.pptx,.doc,.ppt"
                      className="hidden"
                    />

                    {isSubmitted && module.uploadedFile ? (
                      <div className="bg-emerald-500/20 border border-emerald-300/80 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between shadow-xs">
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 font-bold" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-extrabold text-slate-950 truncate">
                              {module.uploadedFile.name}
                            </p>
                            <p className="text-[10px] text-slate-700 font-medium">
                              {module.uploadedFile.size} • {module.uploadedFile.uploadedAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0 ml-2">
                          <button
                            onClick={() => fileInputRefs.current[module.id]?.click()}
                            title="Replace File"
                            className="p-1 rounded-md text-slate-700 hover:text-slate-950 hover:bg-white/50 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveModuleFile(module.id)}
                            title="Remove File"
                            className="p-1 rounded-md text-slate-700 hover:text-red-700 hover:bg-red-100/50 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(module.id, e)}
                        onClick={() => fileInputRefs.current[module.id]?.click()}
                        className="border-2 border-dashed border-white/70 hover:border-teal-400 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-2xl p-3 text-center cursor-pointer transition-all group shadow-xs"
                      >
                        <Upload className="w-4 h-4 text-[#00695c] group-hover:text-teal-600 mx-auto mb-1 transition-colors" />
                        <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950">
                          Click to upload or drag file
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
