import React from 'react';

interface RobotIconProps {
  className?: string;
  size?: number;
}

export const RobotIcon: React.FC<RobotIconProps> = ({ className = 'w-10 h-10', size = 40 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Antenna */}
        <line x1="12" y1="2" x2="12" y2="5" />
        <circle cx="12" cy="2" r="1" fill="currentColor" />

        {/* Head */}
        <rect x="4" y="5" width="16" height="15" rx="3" />

        {/* Ears */}
        <path d="M2 11h2" />
        <path d="M20 11h2" />

        {/* Eyes */}
        <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />

        {/* Mouth */}
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    </div>
  );
};
