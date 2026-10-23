import React, { useState } from 'react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { Header } from './components/Header';
import { LoginStep } from './components/LoginStep';
import { ModulesStep } from './components/ModulesStep';
import { FinalSubmissionStep } from './components/FinalSubmissionStep';
import { ProfileDetailsStep } from './components/ProfileDetailsStep';
import { CertificateStep } from './components/CertificateStep';
import { FeedbackModal } from './components/FeedbackModal';
import { InstallModal } from './components/InstallModal';
import { INITIAL_MODULES } from './data/modulesData';
import {
  PortalStep,
  UserSession,
  ModuleItem,
  FinalSubmissionState,
} from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<PortalStep>(1);

  const [session, setSession] = useState<UserSession>({
    name: '',
    email: '',
    designation: 'Assistant Section Officer',
    department: 'District Administration, Thoothukudi',
    certificateRef: 'CERT-TN-2026-47923',
    issueDate: '21/09/2026',
    verificationHash: 'SHA256: 8F4B92C...9A1',
  });

  const [modules, setModules] = useState<ModuleItem[]>(INITIAL_MODULES);

  const [finalSubmission, setFinalSubmission] = useState<FinalSubmissionState>({
    status: 'pending',
    uploadedFile: null,
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogin = (email: string, name: string) => {
    const cleanName = name.trim() || 'Participant';
    const firstWord = (cleanName.split(' ')[0] || 'TN').toUpperCase();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newRef = `CERT-${firstWord}-2026-${randomSuffix}`;

    setSession((prev) => ({
      ...prev,
      email: email.trim(),
      name: cleanName,
      certificateRef: newRef,
    }));
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

  const handleAutoUploadAll = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setModules((prev) =>
      prev.map((m, idx) => ({
        ...m,
        status: 'submitted',
        uploadedFile: {
          name: m.id === 'mod-09' ? 'MOD09_ON_for_LOA.docx' : `${m.code}_${m.title.replace(/\s+/g, '_')}.${idx % 2 === 0 ? 'docx' : 'pdf'}`,
          size: `${(140 + idx * 24).toFixed(1)} KB`,
          uploadedAt: now,
          type: (m.id === 'mod-09' || idx % 2 === 0) ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf',
        },
      }))
    );
    showToast('All 13 demo AI module documents successfully attached!');
  };

  const handleUploadFinalFile = (file: File) => {
    const sizeInKb = (file.size / 1024).toFixed(1) + ' KB';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setFinalSubmission({
      status: 'submitted',
      uploadedFile: {
        name: file.name,
        size: sizeInKb,
        uploadedAt: now,
        type: file.type,
      },
    });
    showToast('Final Module submission dossier attached!');
  };

  const handleRemoveFinalFile = () => {
    setFinalSubmission({
      status: 'pending',
      uploadedFile: null,
    });
  };

  const handleAutoUploadDemoFinal = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFinalSubmission({
      status: 'submitted',
      uploadedFile: {
        name: 'MOD_FINAL_Comprehensive_Administrative_AI_Synthesis.docx',
        size: '482.4 KB',
        uploadedAt: now,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
    showToast('Attached demo final comprehensive project document!');
  };

  const handleExitSession = () => {
    setCurrentStep(1);
    showToast('Session ended. Returned to login portal.');
  };

  const submittedModulesCount = modules.filter((m) => m.status === 'submitted').length;

  return (
    <div className="min-h-screen relative font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white pb-12">
      {/* Background with real image, glow, and particle waves */}
      <BackgroundGlow />

      {/* Global Header & Stepper (Visible for Steps 2 to 5) */}
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

      {/* Main Content Router for Steps 1 through 5 */}
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

        {/* Step 2: 13 AI Modules Submission Grid */}
        {currentStep === 2 && (
          <ModulesStep
            participantName={session.name}
            modules={modules}
            onUploadModuleFile={handleUploadModuleFile}
            onAutoUploadAll={handleAutoUploadAll}
            onRemoveModuleFile={handleRemoveModuleFile}
            onProceedToFinal={() => setCurrentStep(3)}
          />
        )}

        {/* Step 3: Final Submission Module */}
        {currentStep === 3 && (
          <FinalSubmissionStep
            finalSubmission={finalSubmission}
            onUploadFinalFile={handleUploadFinalFile}
            onRemoveFinalFile={handleRemoveFinalFile}
            onBackToModules={() => setCurrentStep(2)}
            onProceedToProfile={() => setCurrentStep(4)}
            onAutoUploadDemoFinal={handleAutoUploadDemoFinal}
          />
        )}

        {/* Step 4: Profile Details */}
        {currentStep === 4 && (
          <ProfileDetailsStep
            session={session}
            onUpdateSession={handleUpdateSession}
            onBackToFinal={() => setCurrentStep(3)}
            onGenerateCertificate={() => setCurrentStep(5)}
            modulesCompletedCount={modules.length}
          />
        )}

        {/* Step 5: Official Certificate View */}
        {currentStep === 5 && (
          <CertificateStep
            session={session}
            modules={modules}
            onEditDetails={() => setCurrentStep(4)}
            onExitSession={handleExitSession}
            onOpenFeedback={() => setIsFeedbackModalOpen(true)}
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
