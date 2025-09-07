import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X, Flag, Shield } from "lucide-react";

const REPORT_REASONS = [
    "Spam or scam",
    "Inappropriate content",
    "Incorrect job information",
    "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!reason) {
            const reasonSelect = document.querySelector("[data-reason-select]");
            reasonSelect?.classList.add("animate-shake");
            setTimeout(() => reasonSelect?.classList.remove("animate-shake"), 500);
            return;
        }

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            onSubmit({ reason, details });
            setReason("");
            setDetails("");
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        setReason("");
        setDetails("");
        onClose();
    };

    if (!isOpen) return null;

    // Render modal into document.body
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fadeIn">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-indigo-900/80 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400/30 rounded-full animate-float"></div>
                <div
                    className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-400/20 rounded-full animate-float"
                    style={{ animationDelay: "4s" }}
                ></div>
            </div>

            {/* Modal container */}
            <div className="relative w-full max-w-md mx-auto animate-modalSlideIn">
                {/* Glow behind modal */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/15 to-red-500/20 rounded-2xl blur-2xl"></div>

                {/* Main modal */}
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="relative px-6 pt-6 pb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Flag size={20} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Report Job</h2>
                                    <p className="text-sm text-slate-300">Help us maintain quality</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/70 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <X size={18} className="text-slate-300 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="px-6 pb-6 space-y-5">
                        {/* Reason select */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-200">
                                <AlertTriangle size={16} className="mr-2 text-red-400" />
                                Reason for reporting
                            </label>
                            <div className="relative">
                                <select
                                    data-reason-select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-400/50 focus:bg-slate-700/70 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-500/70"
                                    disabled={isSubmitting}
                                >
                                    <option value="" className="bg-slate-800 text-slate-300">
                                        -- Select a reason --
                                    </option>
                                    {REPORT_REASONS.map((r, i) => (
                                        <option key={i} value={r} className="bg-slate-800 text-white py-2">
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Details textarea */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-200">
                                <Shield size={16} className="mr-2 text-blue-400" />
                                Additional Details
                                <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                            </label>
                            <textarea
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="w-full bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/50 focus:bg-slate-700/70 transition-all duration-300 resize-none"
                                placeholder="Provide any additional context that might help us understand the issue better..."
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                            <button
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-600/70 hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600/50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="relative px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed border border-red-400/20"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Flag size={16} />
                                        <span>Submit Report</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-modalSlideIn {
          animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </div>,
        document.body
    );
};

export default ReportModal;
