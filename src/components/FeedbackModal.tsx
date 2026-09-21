import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  participantName,
}) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div
        className="backdrop-blur-2xl bg-white/80 border border-white/80 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(6,182,212,0.3)] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-900"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-white/60 flex items-center justify-between bg-white/40 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#009387] text-white shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 drop-shadow-2xs">
                AI Workshop Feedback
              </h3>
              <p className="text-xs text-slate-700 font-semibold">
                Official participant experience survey
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

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-white/30 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-500/25 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">Thank You, {participantName}!</h4>
            <p className="text-xs text-slate-700 font-medium">
              Your feedback has been logged into the State AI Mission evaluation database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Overall Workshop Effectiveness Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                          : 'text-slate-400'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-800 ml-2">
                  {rating === 5 ? 'Exceptional (5/5)' : `${rating}/5 Stars`}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Practical Application In Daily Administration
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share how the 13 AI modules will improve your official file processing speed, report quality, or citizen grievance response..."
                rows={4}
                className="w-full px-3.5 py-2.5 bg-white/50 border border-white/70 rounded-xl text-xs font-semibold text-slate-950 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white/80 transition-all resize-none backdrop-blur-md shadow-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-white/60 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#009387] hover:bg-[#008276] rounded-xl shadow-xs transition-colors cursor-pointer border border-teal-300/40"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
