import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface OfficialSealProps {
  size?: number;
  className?: string;
  customSealUrl?: string | null;
  onOpenUploadModal?: () => void;
}

export const OfficialSeal: React.FC<OfficialSealProps> = ({
  size = 76,
  className = '',
  customSealUrl,
  onOpenUploadModal,
}) => {
  const [storedSeal, setStoredSeal] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('official_seal_image');
      if (saved) {
        setStoredSeal(saved);
      }
    } catch {
      // ignore
    }
  }, [customSealUrl]);

  const effectiveCustom = customSealUrl || storedSeal;

  const candidateUrls = [
    effectiveCustom,
    '/official-seal.png',
    '/assets/aistudio/image_4cb34bbf.png',
  ].filter(Boolean) as string[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setAllFailed(false);
  }, [effectiveCustom]);

  const handleError = () => {
    if (currentIndex + 1 < candidateUrls.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentSrc = candidateUrls[currentIndex];

  if (allFailed || !currentSrc) {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center ${className} ${
          onOpenUploadModal ? 'cursor-pointer group' : ''
        }`}
        onClick={onOpenUploadModal}
        title={onOpenUploadModal ? 'Click to change/upload Official Seal' : undefined}
      >
        <div className="relative mb-1">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-700 via-rose-600 to-amber-500 border-2 border-red-800 flex items-center justify-center shadow-md">
            <div className="w-13 h-13 rounded-full border border-dashed border-red-200 flex flex-col items-center justify-center text-center p-1 bg-red-900/30 text-white">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <span className="text-[7px] font-extrabold tracking-tighter uppercase leading-none mt-0.5">
                OFFICIAL SEAL
              </span>
            </div>
          </div>
          {/* Ribbon tails */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
            <div className="w-3 h-5 bg-red-800 -rotate-12 rounded-b-xs shadow-xs" />
            <div className="w-3 h-5 bg-red-900 rotate-12 rounded-b-xs shadow-xs" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center ${className} ${
        onOpenUploadModal ? 'cursor-pointer group' : ''
      }`}
      onClick={onOpenUploadModal}
      title={onOpenUploadModal ? 'Official Seal - Click to change/upload seal' : 'Official Verified Seal'}
    >
      <div className="relative">
        <img
          src={currentSrc}
          alt="Official Seal - AI Workshop Program"
          onError={handleError}
          crossOrigin="anonymous"
          style={{
            height: `${size}px`,
            width: `${size}px`,
          }}
          className="object-contain drop-shadow-md select-none rounded-full transition-transform group-hover:scale-105"
        />
        {/* Ribbon tails behind/below the circular seal */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex space-x-1.5 pointer-events-none -z-10">
          <div className="w-3.5 h-6 bg-red-800 -rotate-12 rounded-b-xs shadow-xs opacity-90" />
          <div className="w-3.5 h-6 bg-red-900 rotate-12 rounded-b-xs shadow-xs opacity-90" />
        </div>
      </div>
    </div>
  );
};
