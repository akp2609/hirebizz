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
        <div className={`inline-flex items-center px-2 py-1 rounded-full ${config.bgColor} ${config.textColor} text-xs font-semibold`}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.color} ml-1 animate-pulse`} />
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

    if (!application || typeof application !== 'object') return null;

    const { applicant, appliedAt, status } = application;
    if (!applicant || typeof applicant !== 'object') return null;

    const name = applicant.name ?? "Unknown";
    const email = applicant.email ?? "No email";

    const handleMessageClick = (e) => {
        e.stopPropagation();
        navigate(`/chat/${application.applicant._id}`);
    };

    const handleReportSubmit = async ({ reason, details }) => {
        try {
            await postReport({
                targetId: application.applicant._id,
                targetType: 'user',
                reason,
                details,
            });
            setReportOpen(false);
            alert("✅ Report submitted successfully!");
        } catch (err) {
            console.error("❌ Report submission failed:", err.message);
        }
    };

    return (
        <>
            <div
                className={`group relative transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                onMouseEnter={() => { setIsHovered(true); setShowActions(true); }}
                onMouseLeave={() => { setIsHovered(false); setShowActions(false); }}
            >
                {/* Card Container */}
                <div
                    className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 border border-gray-100 group-hover:border-purple-200 cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    {/* Report button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setReportOpen(true); }}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4"
                    >
                        <div className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1">
                            <Flag className="w-3 h-3" />
                            <span className="hidden sm:inline">Report</span>
                        </div>
                    </button>

                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 mb-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0 mx-auto sm:mx-0 mb-3 sm:mb-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-full flex items-center justify-center">
                                <User className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start space-x-1">
                                <span>{name}</span>
                                <Award className="w-4 h-4 text-yellow-500" />
                            </h3>
                            <div className="flex items-center justify-center sm:justify-start text-gray-600 text-xs sm:text-sm truncate">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500" />
                                {email}
                            </div>
                            <div className="flex items-center justify-center sm:justify-start text-gray-500 text-xs mt-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                Applied: {appliedAt ? new Date(appliedAt).toLocaleDateString() : 'Unknown'}
                            </div>
                        </div>
                    </div>

                    {/* Status + Match Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                        <StatusBadge status={status} />
                        <div className="flex items-center justify-center sm:justify-end text-xs text-gray-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            <span>95% match</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 sm:space-y-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                            className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:scale-105 transition"
                        >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                        </button>

                        {status === "accepted" && (
                            <button
                                onClick={handleMessageClick}
                                className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:scale-105 transition"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Message Applicant</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
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
