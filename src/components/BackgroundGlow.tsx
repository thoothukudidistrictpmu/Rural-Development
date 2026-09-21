import React from 'react';
import bgImage from '../assets/images/ai_portal_background_1789970732187.jpg';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-900">
      {/* Real Generated High-Res Background Image matching screenshot */}
      <img
        src={bgImage}
        alt="AI Portal Ambient Tech Laboratory"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
      />

      {/* Subtle overlay to ensure perfect card contrast and color harmony */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/60" />

      {/* Radiant Cyan & Emerald Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-500/25 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-64 bg-teal-400/15 rounded-full blur-3xl -rotate-12" />

      {/* Dynamic Stardust Wave Accents */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 650 C 200 400, 500 800, 900 450 C 1200 200, 1400 600, 1600 350"
          stroke="url(#waveGrad)"
          strokeWidth="3"
          strokeDasharray="4 8"
        />
        <path
          d="M-80 670 C 220 420, 520 820, 920 470 C 1220 220, 1420 620, 1620 370"
          stroke="url(#waveGrad2)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
