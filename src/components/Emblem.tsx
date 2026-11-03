import React from 'react';
export { GovernmentLogo } from './GovernmentLogo';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const TamilNaduEmblem: React.FC<EmblemProps> = ({ className = 'w-16 h-16', size = 64 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="gopuramGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Circular Ring (Transparent background so certificate/pdf background shows through) */}
        <circle cx="100" cy="100" r="94" fill="none" stroke="#047857" strokeWidth="4" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Sunburst backdrop behind Gopuram */}
        <circle cx="100" cy="95" r="58" fill="url(#sunburst)" />

        {/* Laurel Wreath / Green Foliage Ring */}
        <g stroke="#059669" fill="url(#leafGrad)">
          {/* Left Wreath */}
          <path d="M 32 120 C 26 95 36 60 55 42 C 53 48 48 65 52 82 C 43 78 38 92 42 108 Z" opacity="0.9" />
          <path d="M 28 100 C 22 80 30 55 45 42" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Right Wreath */}
          <path d="M 168 120 C 174 95 164 60 145 42 C 147 48 152 65 148 82 C 157 78 162 92 158 108 Z" opacity="0.9" />
          <path d="M 172 100 C 178 80 170 55 155 42" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Ashoka Lion Pillar Capital at Top Center */}
        <g transform="translate(100, 26) scale(0.65)">
          <path d="M -12 18 L 12 18 L 10 22 L -10 22 Z" fill="#b45309" />
          {/* Wheel Dharma Chakra */}
          <circle cx="0" cy="14" r="5" fill="#1e3a8a" stroke="#d97706" strokeWidth="1" />
          {/* 3 Lions stylized */}
          <path d="M -8 10 C -12 6 -10 0 -5 2 C -3 -3 3 -3 5 2 C 10 0 12 6 8 10 Z" fill="#d97706" stroke="#92400e" strokeWidth="1" />
          <circle cx="-5" cy="5" r="1.5" fill="#ffffff" />
          <circle cx="0" cy="4" r="1.5" fill="#ffffff" />
          <circle cx="5" cy="5" r="1.5" fill="#ffffff" />
        </g>

        {/* Iconic Temple Gopuram Tower (Srivilliputhur Andal Temple Tower) */}
        <g id="gopuram" transform="translate(100, 105)">
          {/* Kalasams at the summit */}
          <g transform="translate(0, -56)">
            <circle cx="-16" cy="0" r="2.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="-8" cy="-2" r="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="0" cy="-4" r="3.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="8" cy="-2" r="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="16" cy="0" r="2.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
            {/* Finials/spires */}
            <line x1="-16" y1="0" x2="-16" y2="-6" stroke="#b45309" strokeWidth="1" />
            <line x1="-8" y1="-2" x2="-8" y2="-9" stroke="#b45309" strokeWidth="1.2" />
            <line x1="0" y1="-4" x2="0" y2="-12" stroke="#b45309" strokeWidth="1.5" />
            <line x1="8" y1="-2" x2="8" y2="-9" stroke="#b45309" strokeWidth="1.2" />
            <line x1="16" y1="0" x2="16" y2="-6" stroke="#b45309" strokeWidth="1" />
          </g>

          {/* Tier 1 (Top) */}
          <polygon points="-18,-52 18,-52 20,-42 -20,-42" fill="url(#gopuramGrad)" stroke="#78350f" strokeWidth="1" />
          <line x1="-14" y1="-47" x2="14" y2="-47" stroke="#fef3c7" strokeWidth="1" />

          {/* Tier 2 */}
          <polygon points="-22,-42 22,-42 25,-30 -25,-30" fill="url(#gopuramGrad)" stroke="#78350f" strokeWidth="1" />
          {/* Tier niche arches */}
          <circle cx="-12" cy="-35" r="2.5" fill="#78350f" />
          <circle cx="0" cy="-35" r="3" fill="#78350f" />
          <circle cx="12" cy="-35" r="2.5" fill="#78350f" />

          {/* Tier 3 */}
          <polygon points="-27,-30 27,-30 31,-16 -31,-16" fill="url(#gopuramGrad)" stroke="#78350f" strokeWidth="1" />
          <rect x="-24" y="-25" width="6" height="6" fill="#78350f" rx="1" />
          <rect x="-11" y="-26" width="6" height="7" fill="#78350f" rx="1" />
          <rect x="5" y="-26" width="6" height="7" fill="#78350f" rx="1" />
          <rect x="18" y="-25" width="6" height="6" fill="#78350f" rx="1" />

          {/* Tier 4 */}
          <polygon points="-33,-16 33,-16 38,0 -38,0" fill="url(#gopuramGrad)" stroke="#78350f" strokeWidth="1" />
          <line x1="-34" y1="-8" x2="34" y2="-8" stroke="#fef3c7" strokeWidth="1.2" />

          {/* Base / Plinth & Main Grand Gateway (Vaasal) */}
          <polygon points="-42,0 42,0 44,22 -44,22" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
          {/* Inner temple portal arch */}
          <path d="M -16 22 L -16 5 C -16 -2 16 -2 16 5 L 16 22 Z" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
          {/* Inner light in gateway */}
          <path d="M -8 22 L -8 11 C -8 7 8 7 8 11 L 8 22 Z" fill="#fef08a" opacity="0.9" />

          {/* Steps */}
          <rect x="-46" y="22" width="92" height="6" fill="#78350f" rx="1" />
          <rect x="-50" y="28" width="100" height="5" fill="#92400e" rx="1" />
        </g>

        {/* Lower Banner / Ribbon: TAMIL NADU GOVERNMENT */}
        <g transform="translate(100, 160)">
          <path d="M -75 0 C -40 12 40 12 75 0 C 65 18 35 24 0 24 C -35 24 -65 18 -75 0 Z" fill="#047857" stroke="#065f46" strokeWidth="1" />
          <path d="M -75 0 L -86 8 L -75 14 Z" fill="#065f46" />
          <path d="M 75 0 L 86 8 L 75 14 Z" fill="#065f46" />
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="bold"
            letterSpacing="0.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            தமிழ்நாடு அரசு
          </text>
        </g>

        {/* Motto: வாய்மையே வெல்லும் */}
        <text
          x="100"
          y="180"
          textAnchor="middle"
          fill="#b45309"
          fontSize="6.5"
          fontWeight="bold"
          letterSpacing="0.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          வாய்மையே வெல்லும்
        </text>
      </svg>
    </div>
  );
};
