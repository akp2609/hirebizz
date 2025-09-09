import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Calendar,
    Eye,
    MessageCircle,
    Flag,
    CheckCircle,
    Clock,
    XCircle,
    Sparkles,
    Star,
    Award,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ApplicantModal from './ApplicantModal';
import ReportModal from '../common/ReportModal';
import { postReport } from '../../services/reportService';

const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return {
                    icon: CheckCircle,
                    color: 'from-green-400 to-emerald-500',
                    bgColor: 'bg-green-50',
                    textColor: 'text-green-700',
                    label: 'Accepted'
                };
            case 'rejected':
                return {
                    icon: XCircle,
                    color: 'from-red-400 to-pink-500',
                    bgColor: 'bg-red-50',
                    textColor: 'text-red-700',
                    label: 'Rejected'
                };
            case 'pending':
            default:
                return {
                    icon: Clock,
                    color: 'from-yellow-400 to-orange-500',
                    bgColor: 'bg-yellow-50',
                    textColor: 'text-yellow-700',
                    label: 'Pending'
                };
        }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.bgColor} ${config.textColor} text-xs font-semibold`}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.color} ml-2 animate-pulse`} />
        </div>
    );
};

const ApplicantCard = ({ application, onStatusChange }) => {
    const [open, setOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!application || typeof application !== 'object') {
        console.warn("Invalid application object:", application);
        return null;
    }

    const { applicant, appliedAt, status } = application;

    if (!applicant || typeof applicant !== 'object') {
        console.warn("Missing or invalid applicant in application:", application);
        return null;
    }

    const name = applicant.name ?? "Unknown";
    const email = applicant.email ?? "No email";

    const handleMessageClick = (e) => {
        e.stopPropagation();
        const applicantId = application.applicant._id;
        navigate(`/chat/${applicantId}`);
    };

    const handleReportSubmit = async ({ reason, details }) => {
        try {
            const formData = {
                targetId: application.applicant._id,
                targetType: 'user',
                reason,
                details,
            };
            await postReport(formData);
            setReportOpen(false);
            alert("✅ Report submitted successfully!");
        } catch (err) {
            console.error("❌ Report submission failed:", err.message);
        }
    };

    return (
        <>
            <div
                className={`group relative overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    } ${isHovered ? 'scale-[1.02] rotate-1' : 'scale-100 rotate-0'}`}
                onMouseEnter={() => {
                    setIsHovered(true);
                    setShowActions(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setShowActions(false);
                }}
            >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Glow effect */}
                <div
                    className={`absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'
                        }`}
                />

                <div
                    className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 p-6 border border-gray-100 group-hover:border-purple-200"
                    onClick={() => setOpen(true)}
                >
                    {/* Report button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setReportOpen(true);
                        }}
                        className={`absolute top-4 right-4 transition-all duration-300 ${showActions ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-2'
                            }`}
                    >
                        <div className="relative group/report">
                            <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg opacity-0 group-hover/report:opacity-20 blur transition-opacity duration-300" />
                            <div className="relative bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all duration-300 hover:scale-105">
                                <Flag className="w-3 h-3" />
                                <span>Report</span>
                            </div>
                        </div>
                    </button>

                    {/* Profile */}
                    <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    {name}
                                </h3>
                                <Award className="w-4 h-4 text-yellow-500" />
                            </div>

                            <div className="flex items-center text-gray-600 text-sm mb-2">
                                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="truncate">{email}</span>
                            </div>

                            <div className="flex items-center text-gray-500 text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                Applied: {appliedAt ? new Date(appliedAt).toLocaleDateString() : 'Unknown'}
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between mb-4">
                        <StatusBadge status={status} />
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <TrendingUp className="w-3 h-3" />
                            <span>95% match</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className={`space-y-3 transition-all duration-300 ${showActions ? 'opacity-100 transform translate-y-0' : 'opacity-80 transform translate-y-1'
                            }`}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(true);
                            }}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                        >
                            <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span>View Details</span>
                            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        </button>

                        {status === "accepted" && (
                            <button
                                onClick={handleMessageClick}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                            >
                                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span>Message Applicant</span>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Real Modals */}
            {open && (
                <ApplicantModal
                    applicantName={name}
                    applicantEmail={email}
                    application={application}
                    onClose={() => setOpen(false)}
                    onStatusChange={onStatusChange}
                    jobId={application.job}
                />
            )}

            {reportOpen && (
                <ReportModal
                    isOpen={reportOpen}
                    onSubmit={handleReportSubmit}
                    onClose={() => setReportOpen(false)}
                />
            )}
        </>
    );
};

export default ApplicantCard;
