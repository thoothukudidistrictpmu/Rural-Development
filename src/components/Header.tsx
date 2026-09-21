import React from 'react';
import { RobotIcon } from './RobotIcon';
import { PortalStep, UserSession } from '../types';
import {
  CheckCircle2,
  Layers,
  FileText,
  User,
  Award,
  Download,
  LogOut,
} from 'lucide-react';

interface HeaderProps {
  currentStep: PortalStep;
  session: UserSession;
  submittedModulesCount: number;
  totalModulesCount: number;
  onNavigateStep: (step: PortalStep) => void;
  onExitSession: () => void;
  onOpenInstall?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  session,
  submittedModulesCount,
  totalModulesCount,
  onNavigateStep,
  onExitSession,
  onOpenInstall,
}) => {
  const stepsConfig = [
    { step: 1 as PortalStep, label: '1. Participant Login', icon: CheckCircle2 },
    { step: 2 as PortalStep, label: `2. ${totalModulesCount} AI Modules`, icon: Layers },
    { step: 3 as PortalStep, label: '3. Final Submission Module', icon: FileText },
    { step: 4 as PortalStep, label: '4. Profile Details', icon: User },
    { step: 5 as PortalStep, label: '5. Certificate', icon: Award },
  ];

  return (
    <header className="w-full bg-white/25 sm:bg-white/35 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.25)] z-30 sticky top-0 transition-all">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center space-x-3.5">
          <RobotIcon size={42} />
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight drop-shadow-2xs">
                AI Workshop Submission Portal
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#009387] text-white shadow-2xs">
                AI Certification
              </span>
            </div>
            <p className="text-xs text-slate-800 font-semibold drop-shadow-2xs">
              Document Submission & Official Certification Portal
            </p>
          </div>
        </div>

        {/* Right User Status & Exit */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-white/50 backdrop-blur-md border border-white/70 rounded-full px-4 py-1.5 text-xs text-slate-900 shadow-xs">
            <span className="font-extrabold text-slate-950">{session.name || 'Participant'}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-700 font-medium truncate max-w-[160px]">{session.email}</span>
            <span className="text-slate-400">•</span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full text-[11px] shadow-2xs ${
                submittedModulesCount === totalModulesCount
                  ? 'bg-emerald-500/25 text-emerald-950 border border-emerald-300/80'
                  : 'bg-teal-500/20 text-teal-950 border border-teal-300/80'
              }`}
            >
              {submittedModulesCount}/{totalModulesCount} Completed
            </span>
          </div>

          {onOpenInstall && (
            <button
              id="btn-install-app-header"
              onClick={onOpenInstall}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-xl border border-teal-300/80 transition-colors backdrop-blur-sm cursor-pointer shadow-2xs"
              title="Download/Install this portal as an app on Windows, Mac, Android, or iOS"
            >
              <Download className="w-3.5 h-3.5 text-[#009387]" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          <button
            id="btn-exit-session-header"
            onClick={onExitSession}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-red-700 px-3 py-1.5 rounded-xl hover:bg-red-100/50 border border-white/50 hover:border-red-300/80 transition-colors backdrop-blur-sm cursor-pointer shadow-2xs"
            title="Exit Session and return to login"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Session</span>
          </button>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="border-t border-white/40 bg-white/20 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[740px]">
          {stepsConfig.map((item, index) => {
            const isCompleted = item.step < currentStep || (item.step === 1 && session.name);
            const isActive = item.step === currentStep;
            const isAccessible = item.step <= currentStep || (item.step === 2 && session.name);

            return (
              <React.Fragment key={item.step}>
                <button
                  id={`stepper-btn-step-${item.step}`}
                  disabled={!isAccessible}
                  onClick={() => isAccessible && onNavigateStep(item.step)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#009387] text-white shadow-xs font-extrabold'
                      : isCompleted
                      ? 'text-[#00695c] hover:bg-white/50 cursor-pointer bg-white/30 border border-white/60 shadow-2xs'
                      : 'text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                  ) : (
                    <item.icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-600'
                      }`}
                    />
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>

                {index < stepsConfig.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-3 transition-colors ${
                      item.step < currentStep ? 'bg-[#009387]' : 'bg-white/40'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};
