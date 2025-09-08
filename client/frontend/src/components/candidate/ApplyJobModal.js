import React, { useEffect, useState } from "react";
import {
    X,
    Upload,
    CheckCircle,
    AlertCircle,
    FileText,
    Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    refreshUserResumeURL,
    uploadResumeFile,
    submitJobApplication,
} from "../../services/userService";

const ApplyJobModal = ({ job, onClose }) => {
    const [step, setStep] = useState(1);
    const [currentResume, setCurrentResume] = useState(null);
    const [loadingResume, setLoadingResume] = useState(true);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Fetch resume when modal opens
    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoadingResume(true);
                const url = await refreshUserResumeURL();
                setCurrentResume(url || null);
            } catch (err) {
                console.error("❌ Failed to fetch resume:", err);
                setCurrentResume(null);
            } finally {
                setLoadingResume(false);
            }
        };
        fetchResume();
    }, []);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            setUploadError({ message: "Only PDF files are allowed." });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError({ message: "File size must be under 5MB." });
            return;
        }

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const resumeUrl = await uploadResumeFile(file);
            setCurrentResume(resumeUrl);
            setUploadSuccess(true);
        } catch (err) {
            console.error("❌ Resume upload failed:", err);
            setUploadError(err.response?.data || { message: "Upload failed." });
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect({ target: { files: e.dataTransfer.files } });
        }
    };

    const handleApplicationSubmit = async () => {
        if (!currentResume) return;
        setSubmitting(true);
        try {
            await submitJobApplication(job._id, {
                resumeURL: currentResume,
                coverLetter,
            });
            onClose();
            navigate("/applications");
        } catch (err) {
            console.error("❌ Failed to submit application:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-slideUp">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Apply for {job.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-6">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex-1 flex items-center">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold transition-colors ${step >= s
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`flex-1 h-1 ${step > s ? "bg-blue-600" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Resume */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            {loadingResume ? (
                                <div className="flex flex-col items-center justify-center py-10">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
                                    <p className="text-blue-600 font-medium">
                                        Loading your resume...
                                    </p>
                                </div>
                            ) : currentResume ? (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-green-100 rounded-full">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="font-semibold text-green-800">
                                            Current Resume Available
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            window.open(currentResume, "_blank", "noopener,noreferrer")
                                        }
                                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 group"
                                    >
                                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span>View Current Resume</span>
                                    </button>

                                    <div className="mt-4 pt-4 border-t border-green-200">
                                        <p className="text-green-700 font-medium mb-2">
                                            Upload a new version (optional):
                                        </p>
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${dragOver
                                                    ? "border-blue-400 bg-blue-50"
                                                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                                }`}
                                            onDrop={handleDrop}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setDragOver(true);
                                            }}
                                            onDragLeave={() => setDragOver(false)}
                                            onClick={() =>
                                                document.getElementById("resume-upload").click()
                                            }
                                        >
                                            <Upload
                                                className={`w-8 h-8 mx-auto mb-2 transition-colors duration-300 ${dragOver ? "text-blue-500" : "text-gray-400"
                                                    }`}
                                            />
                                            <p className="font-medium text-gray-700">
                                                Drop your new resume here or click to browse
                                            </p>
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
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragOver(true);
                                    }}
                                    onDragLeave={() => setDragOver(false)}
                                    onClick={() =>
                                        document.getElementById("resume-upload").click()
                                    }
                                >
                                    <div
                                        className={`p-4 rounded-full mx-auto mb-4 ${dragOver ? "bg-blue-100" : "bg-gray-100"
                                            }`}
                                    >
                                        <Upload
                                            className={`w-8 h-8 ${dragOver ? "text-blue-500" : "text-gray-400"
                                                }`}
                                        />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Upload Your Resume
                                    </h4>
                                    <p className="text-gray-600 mb-4">
                                        Drop your resume here or click to browse
                                    </p>
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
                                    <span className="text-blue-700 font-medium">
                                        Uploading resume...
                                    </span>
                                </div>
                            )}

                            {uploadSuccess && (
                                <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-xl p-4 animate-fadeIn">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-green-700 font-medium">
                                        Resume uploaded successfully!
                                    </span>
                                </div>
                            )}

                            {uploadError && (
                                <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-xl p-4">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-red-700 font-medium">
                                        {uploadError.message}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Cover Letter */}
                    {step === 2 && (
                        <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cover Letter (optional)
                            </label>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Write a short cover letter..."
                            />
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="animate-fadeIn">
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-gray-500" />
                                    <span className="font-medium text-gray-700">Resume:</span>
                                    {currentResume ? (
                                        <a
                                            href={currentResume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Resume
                                        </a>
                                    ) : (
                                        <span className="text-red-500">Not uploaded</span>
                                    )}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Cover Letter:</span>
                                    <p className="mt-2 text-gray-600 whitespace-pre-line">
                                        {coverLetter || "No cover letter provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-200">
                    <button
                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                        disabled={step === 1}
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Back
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={(step === 1 && (loadingResume || !currentResume)) || uploading}
                            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            onClick={handleApplicationSubmit}
                            disabled={!currentResume || submitting}
                            className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
                        >
                            {submitting && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            <span>{submitting ? "Submitting..." : "Submit Application"}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;
