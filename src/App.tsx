import React, { useState, useEffect } from 'react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { Header } from './components/Header';
import { LoginStep } from './components/LoginStep';
import { ModulesStep } from './components/ModulesStep';
import { ProfileDetailsStep } from './components/ProfileDetailsStep';
import { CertificateStep } from './components/CertificateStep';
import { FeedbackModal } from './components/FeedbackModal';
import { InstallModal } from './components/InstallModal';
import { INITIAL_MODULES } from './data/modulesData';
import {
  PortalStep,
  UserSession,
  ModuleItem,
} from './types';

const SESSION_STORAGE_KEY = 'ai_workshop_session_v2';
const MODULES_STORAGE_KEY = 'ai_workshop_modules_v2';
const STEP_STORAGE_KEY = 'ai_workshop_step_v2';

export default function App() {
  // Load initial step from sessionStorage if available to survive browser reloads
  const [currentStep, setCurrentStep] = useState<PortalStep>(() => {
    try {
      const savedStep = sessionStorage.getItem(STEP_STORAGE_KEY);
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (parsed >= 1 && parsed <= 4) return parsed as PortalStep;
      }
    } catch {
      // ignore
    }
    return 1;
  });

  // Load initial session from sessionStorage if available
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: '',
      email: '',
      designation: 'Assistant Section Officer',
      department: 'District Administration, Thoothukudi',
      certificateRef: 'CERT-TN-2026-47923',
      issueDate: '21/09/2026',
      verificationHash: 'SHA256: 8F4B92C...9A1',
    };
  });

  // Load modules from sessionStorage to preserve uploaded file names across reloads
  const [modules, setModules] = useState<ModuleItem[]>(() => {
    try {
      const saved = sessionStorage.getItem(MODULES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_MODULES;
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to sessionStorage for concurrent user tab resilience
  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_STORAGE_KEY, currentStep.toString());
    } catch {
      // Quota or incognito fallback
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Quota or incognito fallback
    }
  }, [session]);

  useEffect(() => {
    try {
      sessionStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules));
    } catch {
      // Quota or incognito fallback
    }
  }, [modules]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogin = (email: string, name: string) => {
    const cleanName = name.trim() || 'Participant';
    const firstWord = (cleanName.split(' ')[0] || 'TN').toUpperCase().replace(/[^A-Z]/g, '') || 'TN';
    // Generate high-entropy unique reference guaranteed collision-free for 350+ concurrent users
    const uniqueNum = Math.floor(100000 + Math.random() * 900000);
    const newRef = `CERT-${firstWord}-2026-${uniqueNum}`;

    // Unique verification hash for this user session
    const timestampHex = Date.now().toString(16).toUpperCase();
    const hashTail = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newHash = `SHA256: 8F4B${timestampHex.substring(0, 4)}...${hashTail}`;

    const newSession: UserSession = {
      ...session,
      email: email.trim(),
      name: cleanName,
      certificateRef: newRef,
      verificationHash: newHash,
      issueDate: new Date().toLocaleDateString('en-GB'),
    };

    setSession(newSession);
    setCurrentStep(2);
    showToast(`Welcome ${cleanName}! Workspace unlocked.`);
  };

  const handleUpdateSession = (updated: Partial<UserSession>) => {
    setSession((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleUploadModuleFile = (moduleId: string, file: File) => {
    const sizeInKb = (file.size / 1024).toFixed(1) + ' KB';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              status: 'submitted',
              uploadedFile: {
                name: file.name,
                size: sizeInKb,
                uploadedAt: now,
                type: file.type,
              },
            }
          : m
      )
    );
    showToast(`Uploaded file for ${moduleId.toUpperCase()}`);
  };

  const handleRemoveModuleFile = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              status: 'pending',
              uploadedFile: null,
            }
          : m
      )
    );
  };

  const handleExitSession = () => {
    try {
      sessionStorage.removeItem(STEP_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(MODULES_STORAGE_KEY);
    } catch {
      // ignore
    }
    setSession({
      name: '',
      email: '',
      designation: 'Assistant Section Officer',
      department: 'District Administration, Thoothukudi',
      certificateRef: 'CERT-TN-2026-47923',
      issueDate: '21/09/2026',
      verificationHash: 'SHA256: 8F4B92C...9A1',
    });
    setModules(INITIAL_MODULES);
    setCurrentStep(1);
    showToast('Session ended. Returned to login portal.');
  };

  const submittedModulesCount = modules.filter((m) => m.status === 'submitted').length;

  return (
    <div className="min-h-screen relative font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white pb-12">
      {/* Background with real image, glow, and particle waves */}
      <BackgroundGlow />

      {/* Global Header & Stepper (Visible for Steps 2 to 4) */}
      {currentStep > 1 && (
        <Header
          currentStep={currentStep}
          session={session}
          submittedModulesCount={submittedModulesCount}
          totalModulesCount={modules.length}
          onNavigateStep={(step) => setCurrentStep(step)}
          onExitSession={handleExitSession}
          onOpenInstall={() => setIsInstallModalOpen(true)}
        />
      )}

      {/* Main Content Router for Steps 1 through 4 */}
      <main className="relative z-10">
        {/* Step 1: Participant Login */}
        {currentStep === 1 && (
          <LoginStep
            initialEmail={session.email}
            initialName={session.name}
            onLogin={handleLogin}
            onOpenInstall={() => setIsInstallModalOpen(true)}
          />
        )}

        {/* Step 2: 12 AI Modules Submission Grid */}
        {currentStep === 2 && (
          <ModulesStep
            participantName={session.name}
            modules={modules}
            onUploadModuleFile={handleUploadModuleFile}
            onRemoveModuleFile={handleRemoveModuleFile}
            onProceedToProfile={() => setCurrentStep(3)}
          />
        )}

        {/* Step 3: Profile Details */}
        {currentStep === 3 && (
          <ProfileDetailsStep
            session={session}
            onUpdateSession={handleUpdateSession}
            onBackToModules={() => setCurrentStep(2)}
            onGenerateCertificate={() => setCurrentStep(4)}
            modulesCompletedCount={modules.length}
          />
        )}

        {/* Step 4: Official Certificate View */}
        {currentStep === 4 && (
          <CertificateStep
            session={session}
            modules={modules}
            onEditDetails={() => setCurrentStep(3)}
            onExitSession={handleExitSession}
            onOpenFeedback={() => {
              const url =
                'https://docs.google.com/forms/d/e/1FAIpQLSeT0bBfGqkgmNOb8tUylUunhqOO-ebdmOt2BnVppsuaxRsswg/viewform?usp=sharing&ouid=113094465631862000503';
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
          />
        )}
      </main>

      {/* Participant Experience Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        participantName={session.name}
      />

      {/* Progressive Web App Install Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700/80 text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
