import React, { useState } from 'react';
import { RobotIcon } from './RobotIcon';
import { Mail, User, ArrowRight, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginStepProps {
  initialEmail: string;
  initialName: string;
  onLogin: (email: string, name: string) => void;
  onOpenInstall?: () => void;
}

export const LoginStep: React.FC<LoginStepProps> = ({
  initialEmail,
  initialName,
  onLogin,
  onOpenInstall,
}) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [name, setName] = useState(initialName || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name for the certificate.');
      return;
    }
    setError('');
    onLogin(email.trim(), name.trim());
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Top Center Logo & Title matching Image 1 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 flex flex-col items-center"
      >
        <div className="mb-4">
          <RobotIcon size={56} className="shadow-xl shadow-teal-500/30 border border-teal-300/40" />
        </div>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          AI-Workshop Submission
          <span className="block mt-1 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">Portal</span>
        </h1>
      </motion.div>

      {/* Main Login Card with lightweight ultra-translucent frosted glass that reveals background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden relative backdrop-blur-xl bg-white/25 sm:bg-white/30 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(6,182,212,0.25)] text-slate-900"
      >
        {/* Specular glass reflection layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

        {/* Top Cyan Accent Border Bar matching image.png */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] relative z-10" />

        <div className="p-7 sm:p-9 relative z-10">
          {/* Top Pill Badges */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#009387] text-white shadow-2xs">
              Portal Login
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/60 text-[#00695c] border border-white/80 shadow-2xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse" />
              Sign In Required
            </span>
          </div>

          {/* Heading & Subtitle matching image.png typography */}
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
              Sign In With Your Email
            </h2>
            <p className="text-sm font-bold text-[#00695c] mt-1 drop-shadow-2xs">
              Participant Verification & Document Submission
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/20 backdrop-blur-md text-red-900 text-xs font-semibold border border-red-300/60 shadow-xs">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field with frosted translucent input */}
            <div>
              <label
                htmlFor="input-login-email"
                className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 drop-shadow-2xs"
              >
                YOUR EMAIL ADDRESS <span className="text-red-600">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00695c]">
                  <Mail className="w-5 h-5 font-bold" />
                </div>
                <input
                  type="email"
                  id="input-login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/45 hover:bg-white/60 focus:bg-white/80 border border-white/70 hover:border-white focus:border-[#009387] rounded-xl text-slate-950 font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#009387]/50 text-sm transition-all shadow-xs backdrop-blur-md"
                />
              </div>
            </div>

            {/* Name Field with frosted translucent input */}
            <div>
              <label
                htmlFor="input-login-name"
                className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 drop-shadow-2xs"
              >
                YOUR FULL NAME (FOR CERTIFICATE) <span className="text-red-600">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00695c]">
                  <User className="w-5 h-5 font-bold" />
                </div>
                <input
                  type="text"
                  id="input-login-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/45 hover:bg-white/60 focus:bg-white/80 border border-white/70 hover:border-white focus:border-[#009387] rounded-xl text-slate-950 font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#009387]/50 text-sm transition-all shadow-xs backdrop-blur-md"
                />
              </div>
              <p className="mt-2 text-xs text-slate-800 font-semibold drop-shadow-2xs">
                This exact name will be engraved on your verified completion certificate.
              </p>
            </div>

            {/* Sign In Button matching the Teal button in image.png */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-enter-workspace"
                className="w-full py-3.5 px-6 rounded-xl bg-[#009387] hover:bg-[#008276] text-white font-bold text-sm shadow-lg shadow-teal-900/30 hover:shadow-teal-900/40 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-teal-300/40"
              >
                <span>Sign In & Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {onOpenInstall && (
              <div className="pt-3 border-t border-white/40 flex items-center justify-center">
                <button
                  type="button"
                  id="btn-install-app-login"
                  onClick={onOpenInstall}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#00695c] hover:text-[#004d40] px-3.5 py-1.5 rounded-full bg-white/50 hover:bg-white/70 border border-white/60 transition-all cursor-pointer shadow-2xs backdrop-blur-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#009387]" />
                  <span>Download / Install this App</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};
