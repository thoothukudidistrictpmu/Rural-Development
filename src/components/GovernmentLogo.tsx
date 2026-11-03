import React, { useState, useEffect } from 'react';
import { TamilNaduEmblem } from './Emblem';

interface GovernmentLogoProps {
  size?: number;
  className?: string;
  customLogoUrl?: string | null;
  onOpenUploadModal?: () => void;
}

export const GovernmentLogo: React.FC<GovernmentLogoProps> = ({
  size = 84,
  className = '',
  customLogoUrl,
  onOpenUploadModal,
}) => {
  const [storedLogo, setStoredLogo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tn_gov_logo');
      if (saved) {
        setStoredLogo(saved);
      }
    } catch {
      // ignore localStorage error
    }
  }, [customLogoUrl]);

  // Candidates list to probe in order (the user uploaded /Tamilnadu-Government-Color.png directly)
  const effectiveCustom = customLogoUrl || storedLogo;

  const candidateUrls = [
    '/Tamilnadu-Government-Color.png',
    effectiveCustom,
    '/Tamilnadu-Government-Color.jpg',
    '/Tamilnadu-Government-Color.svg',
    '/Tamilnadu-Government-Color.jpeg',
    '/Tamilnadu-Government-Color.webp',
    '/assets/Tamilnadu-Government-Color.png',
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
      // All candidates exhausted, show crisp vector emblem
      setAllFailed(true);
    }
  };

  const currentSrc = candidateUrls[currentIndex];

  if (allFailed || !currentSrc) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className} ${
          onOpenUploadModal ? 'cursor-pointer group' : ''
        }`}
        onClick={onOpenUploadModal}
        title={onOpenUploadModal ? 'Click to change/upload Tamil Nadu Government Logo' : undefined}
      >
        <TamilNaduEmblem size={size} />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} ${
        onOpenUploadModal ? 'cursor-pointer group' : ''
      }`}
      onClick={onOpenUploadModal}
      title={onOpenUploadModal ? 'Click to change/upload Tamil Nadu Government Logo' : undefined}
    >
      <img
        src={currentSrc}
        alt="Government of Tamil Nadu"
        onError={handleError}
        crossOrigin="anonymous"
        style={{
          height: `${size}px`,
          maxHeight: `${size}px`,
          width: 'auto',
          backgroundColor: 'transparent',
        }}
        className="object-contain select-none transition-transform group-hover:scale-105"
      />
    </div>
  );
};
