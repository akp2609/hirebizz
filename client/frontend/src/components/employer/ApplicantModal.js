import React, { useEffect, useState } from 'react';
import {
    X,
    Download,
    FileText,
    Mail,
    User,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    ExternalLink,
    Star,
    Award,
    Calendar,
    Eye,
    MessageSquare,
    Sparkles,
    Shield,
    TrendingUp
} from 'lucide-react';
import { getRefreshedResumeUrl, updateApplicationStatus } from "../../services/applicationService";
import { updateJobStats } from "../../services/jobService";
import { toast } from "react-toastify";

const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return {
                    icon: CheckCircle,
                    gradient: 'from-green-400 via-emerald-400 to-teal-500',
                    bgGradient: 'from-green-50 to-emerald-50',
                    textColor: 'text-green-700',
                    label: 'Accepted',
                    shadowColor: 'shadow-green-200/50'
                };
            case 'rejected':
                return {
                    icon: XCircle,
                    gradient: 'from-red-400 via-pink-400 to-rose-500',
                    bgGradient: 'from-red-50 to-pink-50',
                    textColor: 'text-red-700',
                    label: 'Rejected',
                    shadowColor: 'shadow-red-200/50'
                };
            case 'pending':
            case 'reviewed':
            default:
                return {
                    icon: Clock,
                    gradient: 'from-yellow-400 via-amber-400 to-orange-500',
                    bgGradient: 'from-yellow-50 to-amber-50',
                    textColor: 'text-yellow-700',
                    label: 'Under Review',
                    shadowColor: 'shadow-yellow-200/50'
                };
        }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${config.bgGradient} ${config.textColor} text-sm font-semibold shadow-lg ${config.shadowColor} border border-white/50`}>
            <Icon className="w-4 h-4 mr-2" />
            {config.label}
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient} ml-2 animate-pulse`} />
        </div>
    );
};

const ApplicantModal = ({ applicantName, applicantEmail, application, onClose, onStatusChange, jobId }) => {
    const [loading, setLoading] = useState(false);
    const [resumeURL, setResume] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        setIsVisible(true);
        const getApplicantResumeUrl = async () => {
            setLoading(true);
            try {
                if (!application?._id) return;
                const res = await getRefreshedResumeUrl(application._id);
                setResume(res);
            } catch (err) {
                console.error('Failed to fetch applicant refreshed resume', err);
                toast.error('Failed to load resume');
            } finally {
                setLoading(false);
            }
        };

        getApplicantResumeUrl();
    }, [application?._id]);

    if (!application || typeof application !== 'object') return null;

    const { _id: applicationId, coverLetter, status } = application;

    const handleStatusUpdate = async (newStatus) => {
        try {
            setActionLoading(true);
            await updateApplicationStatus(applicationId, { status: newStatus });
            toast.success(`Application ${newStatus} successfully!`);
            onStatusChange?.();
            setTimeout(() => onClose(), 500);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status');
        } finally {
            setActionLoading(false);
        }
    };

    const handleResumeDownload = async (e) => {
        e.preventDefault();
        if (!resumeURL) {
            toast.error("No resume available for download");
            return;
        }

        updateJobStats(jobId, "download");
        window.open(resumeURL, "_blank", "noopener,noreferrer");
        toast.success("Resume opened successfully!");
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
                }`}
            onClick={handleClose}
        >
            <div
                className={`relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-8 pb-6 border-b border-gray-100">
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="flex items-start space-x-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                                <Star className="w-4 h-4 text-white fill-current" />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                {applicantName || 'Unknown Applicant'}
                            </h2>
                            <div className="flex items-center text-gray-600 mb-3">
                                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="text-sm">{applicantEmail || 'No email provided'}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <StatusBadge status={status} />
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>98% match</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="relative px-8 pt-6">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                        {[
                            { id: 'overview', label: 'Overview', icon: Eye },
                            { id: 'documents', label: 'Documents', icon: FileText },
                            { id: 'cover', label: 'Cover Letter', icon: MessageSquare }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-white text-purple-600 shadow-md'
                                        : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative p-8 space-y-6 max-h-96 overflow-y-auto">
                    {activeTab === 'documents' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-500 rounded-lg">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Resume</h3>
                                            <p className="text-sm text-gray-600">PDF Document</p>
                                        </div>
                                    </div>
                                    {loading ? (
                                        <div className="flex items-center space-x-2 text-blue-600">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="text-sm">Loading...</span>
                                        </div>
                                    ) : resumeURL ? (
                                        <button
                                            onClick={handleResumeDownload}
                                            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="text-sm">View Resume</span>
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">No resume available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cover' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-purple-500 rounded-lg">
                                        <MessageSquare className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-700">Cover Letter</h3>
                                </div>
                                <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
                                    <p className="text-gray-700 leading-relaxed">
                                        {coverLetter || 'No cover letter provided by the applicant.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="relative p-8 pt-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between items-center">
                        {(status === 'pending' || status === 'reviewed') ? (
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleStatusUpdate("accepted")}
                                    disabled={actionLoading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:scale-100"
                                >
                                    {actionLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="w-4 h-4" />
                                    )}
                                    <span>Accept</span>
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate("rejected")}
                                    disabled={actionLoading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:scale-100"
                                >
                                    {actionLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <XCircle className="w-4 h-4" />
                                    )}
                                    <span>Reject</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-600 font-medium">
                                    Application has been {status}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={handleClose}
                            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                            <X className="w-4 h-4" />
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicantModal;
