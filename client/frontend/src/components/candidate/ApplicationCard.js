import React, { useEffect, useState } from "react";
import {
    Building2,
    MapPin,
    Calendar,
    FileText,
    Download,
    Trash2,
    Eye,
    EyeOff,
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
} from "lucide-react";
import {
    getRefreshedResumeUrl,
    withdrawJobApplication,
} from "../../services/applicationService";
import { toast } from "react-hot-toast";

const ApplicationCard = ({ id, application, onWithdraw }) => {
    const { job, coverLetter, status, appliedAt, resumeObject, _id: applicationId } =
        application;

    const [showFull, setShowFull] = useState(false);
    const [resumeURL, setResumeURL] = useState(null);
    const [loadingResume, setLoadingResume] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchResumeUrl = async () => {
            if (!resumeObject) return;

            setLoadingResume(true);
            try {
                const resume = await getRefreshedResumeUrl(applicationId);
                if (isMounted && resume) {
                    setResumeURL(resume);
                }
            } catch (err) {
                if (isMounted) console.error(err);
            } finally {
                if (isMounted) setLoadingResume(false);
            }
        };

        fetchResumeUrl();
        return () => {
            isMounted = false;
        };
    }, [applicationId, resumeObject]);

    const handleWithdraw = async () => {
        if (!window.confirm("Are you sure you want to withdraw this application?"))
            return;
        setWithdrawing(true);
        try {
            await withdrawJobApplication(id);
            toast.success("Application withdrawn");
            onWithdraw?.(id);
        } catch (err) {
            toast.error("Failed to withdraw");
            console.error(err);
        } finally {
            setWithdrawing(false);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                bg: "from-yellow-50 to-orange-50",
                border: "border-yellow-200",
                text: "text-yellow-700",
                icon: Clock,
                iconBg: "bg-yellow-100",
                label: "Under Review",
            },
            accepted: {
                bg: "from-green-50 to-emerald-50",
                border: "border-green-200",
                text: "text-green-700",
                icon: CheckCircle,
                iconBg: "bg-green-100",
                label: "Accepted",
            },
            rejected: {
                bg: "from-red-50 to-pink-50",
                border: "border-red-200",
                text: "text-red-700",
                icon: XCircle,
                iconBg: "bg-red-100",
                label: "Rejected",
            },
        };
        return configs[status] || configs.pending;
    };

    const statusConfig = getStatusConfig(status);
    const StatusIcon = statusConfig.icon;

    if (!job || !job.title) {
        return (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow p-6 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Job Unavailable
                </h3>
                <p className="text-gray-500">
                    This job posting may have been removed or is no longer available.
                </p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div
            className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden ${isHovered ? "scale-[1.01]" : ""
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Status bar */}
            <div
                className={`h-1 bg-gradient-to-r ${statusConfig.bg.replace("50", "400")}`}
            />

            <div className="p-5 space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-800 truncate">
                            {job.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-1 text-sm">
                            <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {job.company?.name || "Unknown Company"}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location || "Location not specified"}
                            </span>
                        </div>
                    </div>

                    {/* Status */}
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusConfig.border} bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text} text-sm font-medium`}
                    >
                        <div className={`p-1 rounded-full ${statusConfig.iconBg}`}>
                            <StatusIcon className="w-4 h-4" />
                        </div>
                        <span>{statusConfig.label}</span>
                    </div>
                </div>

                {/* Cover Letter */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-700 text-sm">
                            Cover Letter
                        </span>
                    </div>
                    <p className={`text-gray-700 text-sm ${!showFull ? "line-clamp-3" : ""}`}>
                        {coverLetter || "No cover letter provided."}
                    </p>
                    {coverLetter && coverLetter.length > 120 && (
                        <button
                            onClick={() => setShowFull(!showFull)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs mt-2"
                        >
                            {showFull ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showFull ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                    {/* Left: Withdraw + Date */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleWithdraw}
                            disabled={withdrawing}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${withdrawing
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                }`}
                        >
                            {withdrawing ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                    Withdrawing...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Withdraw
                                </>
                            )}
                        </button>
                        <span className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Applied {formatDate(appliedAt)}
                        </span>
                    </div>

                    {/* Right: Resume */}
                    <div>
                        {loadingResume ? (
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <span className="italic">Loading resume...</span>
                            </div>
                        ) : resumeURL ? (
                            <a
                                href={resumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-200 font-medium"
                            >
                                <Download className="w-4 h-4" />
                                View Resume
                            </a>
                        ) : (
                            <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                                <XCircle className="w-4 h-4" />
                                Resume unavailable
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
