import React, { useState } from 'react';
import { UserSession } from '../types';
import { GovernmentLogo } from './GovernmentLogo';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  Building2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileDetailsStepProps {
  session: UserSession;
  onUpdateSession: (updated: Partial<UserSession>) => void;
  onBackToFinal: () => void;
  onGenerateCertificate: () => void;
  modulesCompletedCount: number;
}

export const ProfileDetailsStep: React.FC<ProfileDetailsStepProps> = ({
  session,
  onUpdateSession,
  onBackToFinal,
  onGenerateCertificate,
  modulesCompletedCount,
}) => {
  const [name, setName] = useState(session.name || '');
  const [designation, setDesignation] = useState(
    session.designation || 'Assistant Section Officer'
  );
  const [department, setDepartment] = useState(
    session.department || 'District Administration, Thoothukudi'
  );

  const designationSuggestions = ['VAO', 'Revenue Inspector', 'Deputy Tahsildar'];
  const departmentSuggestions = [
    'Revenue & Disaster Management',
    'Rural Development & Panchayat Raj',
  ];

  const handleSaveAndGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSession({
      name: name.trim() || session.name || 'Participant',
      designation: designation.trim() || 'VAO',
      department: department.trim() || 'Revenue & Disaster Management',
    });
    onGenerateCertificate();
  };

  const handleNameChange = (val: string) => {
    setName(val);
    onUpdateSession({ name: val });
  };

  const handleDesignationChange = (val: string) => {
    setDesignation(val);
    onUpdateSession({ designation: val });
  };

  const handleDepartmentChange = (val: string) => {
    setDepartment(val);
    onUpdateSession({ department: val });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Top Navigation Bar matching Image 4 */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-back-to-final-module"
          onClick={onBackToFinal}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/40 backdrop-blur-md hover:bg-white/60 text-slate-800 text-xs font-bold rounded-full border border-white/60 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Final Module</span>
        </button>

        <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#009387] text-white text-xs font-bold rounded-full shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 4 of 5: Profile Details</span>
        </span>
      </div>

      {/* Two Column Layout matching Image 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Form (7 cols) in frosted glass */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-7 backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] rounded-3xl overflow-hidden relative text-slate-900"
        >
          {/* Subtle glass reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

          {/* Top Cyan Accent Line */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] relative z-10" />

          <div className="p-6 sm:p-8 relative z-10">
            {/* Badges */}
            <div className="flex items-center justify-between mb-5">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#009387] text-white shadow-2xs">
                Recipient Identity
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/25 text-emerald-950 border border-emerald-300/80 shadow-2xs backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mr-1.5" />
                Verification Ready
              </span>
            </div>

            {/* Title and Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
                Participant Profile Details
              </h2>
              <p className="text-sm font-bold text-[#00695c] mt-1 drop-shadow-2xs">
                Official AI Workshop Certificate Issuance
              </p>
              <p className="text-xs text-slate-800 font-semibold mt-2 leading-relaxed drop-shadow-2xs">
                Please enter your full name, designation, and department exactly as they should be
                printed on the official AI Workshop completion certificate.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAndGenerate} className="space-y-6">
              {/* Field 1: Full Name */}
              <div>
                <label
                  htmlFor="input-profile-name"
                  className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2"
                >
                  FULL NAME (CERTIFICATE RECIPIENT) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-5 h-5 text-teal-700" />
                  </div>
                  <input
                    type="text"
                    id="input-profile-name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/80 border border-white/70 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-bold transition-all shadow-xs backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Field 2: Designation */}
              <div>
                <label
                  htmlFor="input-profile-designation"
                  className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2"
                >
                  DESIGNATION / POSITION <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Briefcase className="w-5 h-5 text-teal-700" />
                  </div>
                  <input
                    type="text"
                    id="input-profile-designation"
                    value={designation}
                    onChange={(e) => handleDesignationChange(e.target.value)}
                    placeholder="e.g. VAO"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/80 border border-white/70 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-bold transition-all shadow-xs backdrop-blur-md"
                  />
                </div>

                {/* Quick Chips matching Image 4 */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {designationSuggestions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleDesignationChange(item)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        designation === item
                          ? 'bg-[#009387] text-white border-teal-300 shadow-xs'
                          : 'bg-white/50 text-slate-800 border-white/70 hover:bg-white/75 backdrop-blur-xs'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 3: Department */}
              <div>
                <label
                  htmlFor="input-profile-department"
                  className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2"
                >
                  DEPARTMENT <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <input
                    type="text"
                    id="input-profile-department"
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    placeholder="e.g. Revenue & Disaster Management"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/80 border border-white/70 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-bold transition-all shadow-xs backdrop-blur-md"
                  />
                </div>

                {/* Quick Chips */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {departmentSuggestions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleDepartmentChange(item)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        department === item
                          ? 'bg-[#009387] text-white border-teal-300 shadow-xs'
                          : 'bg-white/50 text-slate-800 border-white/70 hover:bg-white/75 backdrop-blur-xs'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Official Certificate Button */}
              <div className="pt-4 border-t border-white/40">
                <button
                  type="submit"
                  id="btn-generate-official-certificate"
                  className="w-full py-4 px-6 rounded-xl bg-[#009387] hover:bg-[#008276] text-white font-extrabold text-sm shadow-md hover:shadow-teal-900/30 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-teal-300/40"
                >
                  <span>Generate Official Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Live Credential Preview matching Image 4 (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:col-span-5 space-y-5"
        >
          {/* Main Preview Container in frosted glass */}
          <div className="backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] rounded-3xl overflow-hidden p-6 sm:p-7 relative text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#009387] text-white uppercase tracking-wider shadow-2xs">
                  PREVIEW
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700 mr-1" />
                  Live Credential Preview
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/25 text-emerald-950 border border-emerald-300/80 shadow-2xs">
                {modulesCompletedCount}/{modulesCompletedCount} Verified
              </span>
            </div>

            {/* Live Certificate Mini Card matching Image 4 */}
            <div className="bg-white/90 backdrop-blur-md border-2 border-white/90 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
              {/* Inner subtle border */}
              <div className="absolute inset-1.5 border border-amber-400/50 rounded-xl pointer-events-none" />

              {/* State Emblem */}
              <div className="mb-3 flex justify-center">
                <GovernmentLogo size={56} />
              </div>

              <h4 className="text-[10px] tracking-widest uppercase font-bold text-slate-500 mb-1">
                AI WORKSHOP COMPLETION CERTIFICATE
              </h4>

              {/* Recipient Name in Serif */}
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-slate-900 my-2 tracking-tight"
              >
                {name || 'Participant Name'}
              </h3>

              {/* Designation & Department */}
              <p className="text-sm font-bold text-teal-700 mb-0.5">
                {designation || 'Assistant Section Officer'}
              </p>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                {department || 'District Administration, Thoothukudi'}
              </p>

              {/* Footer row */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {modulesCompletedCount} Modules Complete
                </span>
                <span>Date: {session.issueDate || '21/09/2026'}</span>
              </div>
            </div>

            {/* Subtext */}
            <p className="text-[11px] text-slate-800 font-medium text-center mt-4">
              Direct high-resolution PDF and PNG certificate downloads available upon generation.
            </p>
          </div>

          {/* Official Verification Stamp Card matching Image 4 */}
          <div className="bg-white/35 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-900 text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Official Verification Stamp</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              Your certificate will feature an immutable cryptographic checksum hash and digital authority signatures.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
