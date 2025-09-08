import React, { useState, useEffect } from "react";
import {
    X, Upload, FileText, Send, CheckCircle, AlertCircle,
    Eye, Sparkles, Briefcase, Mail
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import useResumeUpload from "../../hooks/useResumeUpload";
import { useApplication } from "../../hooks/useApplication";
import { toast } from "react-hot-toast";
import { refreshUserResumeURL } from "../../services/userService";

const ApplyJobModal = ({ jobId, isOpen, onClose, jobTitle = "Job Title", company = "Company" }) => {
    const { user } = useUser();
    const { resume, uploadNewResume, uploading, error: uploadError } = useResumeUpload();
    const { postNewApplication, applying } = useApplication();

    const [coverLetter, setCoverLetter] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [currentResume, setCurrentResume] = useState(null);

    // when modal opens, fetch fresh resume URL
    useEffect(() => {
        const fetchResume = async () => {
            try {
                const latestResume = await refreshUserResumeURL();
                if (latestResume) {
                    setCurrentResume(latestResume);
                } else {
                    setCurrentResume(null); // no resume uploaded yet
                }
            } catch (err) {
                console.error("Error refreshing resume URL:", err);
                setCurrentResume(user?.resumeURL || null); // fallback
            }
        };

        if (isOpen) {
            setIsVisible(true);
            fetchResume();
        }
    }, [isOpen]);

    // update when new resume is uploaded via hook
    useEffect(() => {
        if (resume) setCurrentResume(resume);
    }, [resume]);

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

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"
                }`}
        >
            {/* Background click */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Modal container */}
            <div
                className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-500 flex flex-col ${isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-8"
                    }`}
                style={{ maxHeight: "70vh" }}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 sm:p-8 rounded-t-3xl overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-1000" />
                    </div>

                    <div className="relative flex items-center justify-between">
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

                    {/* Steps */}
                    <div className="flex items-center justify-center space-x-4 mt-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center">
                                <div
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${i <= step ? "bg-white text-blue-600 shadow-lg" : "bg-white/20 text-white/60"
                                        }`}
                                >
                                    {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                                </div>
                                {i < 3 && (
                                    <div
                                        className={`w-12 sm:w-16 h-1 mx-2 rounded-full transition-colors duration-300 ${i < step ? "bg-white" : "bg-white/20"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    {/* Step 1: Resume */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            {currentResume ? (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-green-100 rounded-full">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="font-semibold text-green-800">Current Resume Available</span>
                                    </div>

                                    <button
                                        onClick={() => window.open(currentResume, "_blank", "noopener,noreferrer")}
                                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 group"
                                    >
                                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span>View Current Resume</span>
                                    </button>

                                    <div className="mt-4 pt-4 border-t border-green-200">
                                        <p className="text-green-700 font-medium mb-2">Upload a new version (optional):</p>
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${dragOver
                                                ? "border-blue-400 bg-blue-50"
                                                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                                }`}
                                            onDrop={handleDrop}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onClick={() => document.getElementById("resume-upload").click()}
                                        >
                                            <Upload
                                                className={`w-8 h-8 mx-auto mb-2 transition-colors duration-300 ${dragOver ? "text-blue-500" : "text-gray-400"
                                                    }`}
                                            />
                                            <p className="font-medium text-gray-700">Drop your new resume here or click to browse</p>
                                            <p className="text-sm text-gray-500 mt-1">PDF format only</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${dragOver
                                        ? "border-blue-400 bg-blue-50"
                                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }`}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onClick={() => document.getElementById("resume-upload").click()}
                                >
                                    <div className={`p-4 rounded-full mx-auto mb-4 ${dragOver ? "bg-blue-100" : "bg-gray-100"}`}>
                                        <Upload className={`w-8 h-8 ${dragOver ? "text-blue-500" : "text-gray-400"}`} />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Upload Your Resume</h4>
                                    <p className="text-gray-600 mb-4">Drop your resume here or click to browse</p>
                                    <p className="text-sm text-gray-500">PDF format only • Max 5MB</p>
                                </div>
                            )}

                            <input
                                id="resume-upload"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileSelect}
                                disabled={uploading}
                                className="hidden"
                            />

                            {uploading && (
                                <div className="flex items-center justify-center space-x-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-blue-700 font-medium">Uploading resume...</span>
                                </div>
                            )}

                            {uploadSuccess && (
                                <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-xl p-4 animate-fadeIn">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-green-700 font-medium">Resume uploaded successfully!</span>
                                </div>
                            )}

                            {uploadError && (
                                <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-xl p-4">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-red-700 font-medium">{uploadError.message}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Cover Letter */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center">
                                <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Write Your Cover Letter</h3>
                                <p className="text-gray-600">Tell us why you're the perfect fit</p>
                            </div>

                            <div className="relative">
                                <textarea
                                    className="w-full border-2 border-gray-200 focus:border-purple-500 rounded-2xl p-6 text-gray-700 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 resize-none"
                                    placeholder="Dear Hiring Manager,&#10;&#10;I am excited to apply for this position because..."
                                    rows={8}
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                />
                                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                                    {coverLetter.length}/500 characters
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Review Your Application</h3>
                                <p className="text-gray-600">Make sure everything looks perfect</p>
                            </div>

                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-4">Application Summary:</h4>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700">Resume: {currentResume ? "Attached" : "Not uploaded"}</span>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Mail className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div className="flex-1">
                                            <span className="text-gray-700">Cover Letter:</span>
                                            <div className="mt-2 bg-white rounded-lg p-3 border border-gray-200">
                                                <p className="text-gray-600 text-sm">
                                                    {coverLetter || "No cover letter provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 rounded-b-3xl flex justify-between">
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

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ApplyJobModal;
