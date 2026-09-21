import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor, CheckCircle, Share2, PlusSquare } from 'lucide-react';
import { RobotIcon } from './RobotIcon';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'chrome' | 'ios' | 'android'>('chrome');

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="backdrop-blur-2xl bg-white/90 border border-white/80 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(6,182,212,0.3)] w-full max-w-lg overflow-hidden flex flex-col text-slate-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/60 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <RobotIcon size={32} />
            <div>
              <h3 className="text-base font-extrabold text-slate-900 drop-shadow-2xs">
                Install as Desktop / Mobile App
              </h3>
              <p className="text-xs text-slate-700 font-semibold">
                Progressive Web App (PWA) Offline & Standalone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors cursor-pointer border border-transparent hover:border-white/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Status or One-Click Prompt if supported */}
          {deferredPrompt ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Direct 1-Click Install Available</h4>
                <p className="text-xs text-emerald-700 mt-0.5">Your browser supports instant installation.</p>
              </div>
              <button
                onClick={handleNativeInstall}
                className="px-4 py-2 bg-[#009387] hover:bg-[#008276] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install Now</span>
              </button>
            </div>
          ) : isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center space-x-3 shadow-xs">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">App Already Installed</h4>
                <p className="text-xs text-emerald-700">You are running the app in standalone mode.</p>
              </div>
            </div>
          ) : (
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-2xl p-3.5 text-xs text-slate-800">
              You can install this workshop portal as a desktop application on Windows/Mac, or add it to your home screen on Android & iPhone.
            </div>
          )}

          {/* OS / Browser Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('chrome')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'chrome'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Computer / Chrome</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'android'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'ios'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone / Safari</span>
            </button>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="bg-white/60 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-3">
            {activeTab === 'chrome' && (
              <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium">
                <li>
                  Open this portal in <strong>Google Chrome</strong>, <strong>Brave</strong>, or <strong>Microsoft Edge</strong>.
                </li>
                <li>
                  Look at the right side of the address bar (URL bar) for the <strong>Install App icon (computer with down arrow)</strong>.
                </li>
                <li>
                  Click <strong>Install</strong>. It creates a desktop shortcut and launches as a standalone window without browser tabs.
                </li>
              </ol>
            )}

            {activeTab === 'android' && (
              <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium">
                <li>Open this site in <strong>Google Chrome</strong> on your phone.</li>
                <li>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.</li>
                <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>The AI Workshop icon will appear on your app drawer and home screen.</li>
              </ol>
            )}

            {activeTab === 'ios' && (
              <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium">
                <li>
                  Open this portal in <strong>Safari</strong> on your iPhone or iPad.
                </li>
                <li>
                  Tap the <Share2 className="w-3.5 h-3.5 inline text-sky-600 mx-1" /> <strong>Share</strong> button at the bottom of the screen.
                </li>
                <li>
                  Scroll down and select <PlusSquare className="w-3.5 h-3.5 inline text-slate-700 mx-1" /> <strong>"Add to Home Screen"</strong>.
                </li>
                <li>Tap <strong>Add</strong> in the top-right corner.</li>
              </ol>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/60 bg-white/40 backdrop-blur-md flex items-center justify-between text-xs text-slate-700 font-semibold">
          <span>Works offline & full-screen</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#009387] text-white font-bold hover:bg-[#008276] transition-colors cursor-pointer shadow-xs"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
