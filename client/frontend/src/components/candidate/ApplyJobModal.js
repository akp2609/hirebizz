import React, { useState, useEffect } from "react";
import {
    X, Upload, FileText, Send, CheckCircle, AlertCircle,
    Eye, Sparkles, Briefcase, User, Mail
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import useResumeUpload from "../../hooks/useResumeUpload";
import { useApplication } from "../../hooks/useApplication";
import { toast } from "react-hot-toast";

const ApplyJobModal = ({ jobId, isOpen, onClose, jobTitle = "Job Title", company = "Company" }) => {
    const { user } = useUser();
    const { resume, uploadNewResume, uploading, error: uploadError } = useResumeUpload();
    const { postNewApplication, applying } = useApplication();

    const [coverLetter, setCoverLetter] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [currentResume, setCurrentResume] = useState(user?.resumeURL || resume);

    useEffect(() => {
        if (isOpen) setIsVisible(true);
    }, [isOpen]);

    useEffect(() => {
        setCurrentResume(resume || user?.resumeURL);
    }, [resume, user?.resumeURL]);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            setCoverLetter("");
            setStep(1);
        }, 300);
    };

    const handleResumeUpload = async (file) => {
        if (!file) return;
        setUploadSuccess(false);
        const uploadedURL = await uploadNewResume(file);

        if (uploadedURL) {
            toast.success("Resume uploaded!");
            setUploadSuccess(true);
            setCurrentResume(uploadedURL);
            setTimeout(() => setUploadSuccess(false), 3000);
        } else {
            toast.error("Resume upload failed.");
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) handleResumeUpload(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleResumeUpload(file);
    };

    const handleApply = async () => {
        if (!currentResume) {
            toast.error("Please upload a resume first.");
            return;
        }
        try {
            const result = await postNewApplication({ jobId, coverLetter });
            if (result) {
                toast.success("Application submitted!");
                handleClose();
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong.");
        }
    };

    const nextStep = () => setStep(Math.min(step + 1, 3));
    const prevStep = () => setStep(Math.max(step - 1, 1));

    const viewResume = () => {
        if (!currentResume) {
            toast.error("No resume available");
            return;
        }
        window.open(currentResume, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 transition-all duration-300 ${isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"
                }`}
        >
            {/* background click */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* modal container */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto transform transition-all duration-500 flex flex-col max-h-[70vh]">

                {/* content wrapper with scroll if needed */}
                <div className="flex-1 overflow-y-auto">
                    {/* header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 sm:p-8 rounded-t-3xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                    <Briefcase className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Apply for Position</h2>
                                    <div className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
                                        <span className="text-white/90 font-medium">{jobTitle}</span>
                                        <span className="text-white/70">•</span>
                                        <span className="text-white/90">{company}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300 group"
                            >
                                <X className="w-5 sm:w-6 h-5 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* step content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                {/* resume upload logic here (unchanged) */}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                {/* cover letter logic here (unchanged) */}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                {/* review step logic here (unchanged) */}
                            </div>
                        )}
                    </div>
                </div>

                {/* footer always fixed at bottom of modal card */}
                <div className="bg-gray-50 px-4 sm:px-8 py-4 sm:py-6 rounded-b-3xl flex justify-between">
                    <button
                        onClick={step === 1 ? handleClose : prevStep}
                        className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                    >
                        {step === 1 ? "Cancel" : "Back"}
                    </button>

                    <div className="flex space-x-2 sm:space-x-3">
                        {step < 3 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <span>Continue</span>
                                <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleApply}
                                className={`flex items-center space-x-2 px-5 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${applying
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-105"
                                    }`}
                                disabled={uploading || applying}
                            >
                                {applying ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Submit Application</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;
