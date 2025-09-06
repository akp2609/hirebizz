import React, { useEffect, useState } from 'react';
import BookmarkIcon from './BookmarkIcon';
import { saveJob, deleteUserSavedJob } from '../../services/userService';
import { useUser } from '../../context/UserContext';
import ReportModal from './ReportModal';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { postReport } from '../../services/reportService';

const JobCard = ({ job, onClick, isSaved: initiallySaved = false }) => {
    const {
        _id,
        title,
        description,
        location,
        company,
        skills,
        compensation,
        relevancy,
        isActive,
        createdAt,
    } = job || {};

    const [isSaved, setIsSaved] = useState(initiallySaved);
    const [loadingSave, setLoadingSave] = useState(false);
    const { user } = useUser();
    const [showMenu, setShowMenu] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const toggleMenu = () => setShowMenu(prev => !prev);

    useEffect(() => {
        setIsSaved(initiallySaved);
    }, [initiallySaved]);

    const handleToggleSave = async () => {
        try {
            setLoadingSave(true);
            if (isSaved) {
                await deleteUserSavedJob(_id);
                setIsSaved(false);
            } else {
                await saveJob(_id);
                setIsSaved(true);
            }
        } catch (err) {
            console.error("❌ Save toggle failed:", err.message);
        } finally {
            setLoadingSave(false);
        }
    };

    const handleReportSubmit = async ({ reason, details }) => {
        try{
            const formData = {
                targetId: _id,
                targetType: 'job',
                reason,
                details,
            }
            await postReport(formData);
            setShowReportModal(false);
            alert("✅ Report submitted successfully!");
        }catch(err){
            console.error("❌ Report submission failed:", err.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-200/50 hover:border-blue-300/50 transform hover:scale-[1.02]">
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Top accent bar */}
            <div className={`h-1 bg-gradient-to-r transition-all duration-300 ${
                isActive 
                    ? 'from-green-400 via-blue-500 to-indigo-500' 
                    : 'from-gray-400 via-gray-500 to-gray-600'
            }`}></div>
            
            <div className="relative p-6 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-3">
                        <div className="flex items-start gap-3 mb-2">
                            <div className="flex-shrink-0 mt-1">
                                <BookmarkIcon 
                                    isSaved={isSaved} 
                                    onClick={handleToggleSave}
                                    className="transform hover:scale-110 transition-transform duration-200" 
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                                    {title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H5m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2z" />
                                        </svg>
                                        <span className="font-medium text-gray-800 truncate">
                                            {company?.name || 'Unknown Company'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="truncate">{location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status and Menu Section */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">{formatDate(createdAt)}</p>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                                        : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                        isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                    }`}></div>
                                    {isActive ? 'Active' : 'Closed'}
                                </div>
                            </div>
                            
                            {user?.role === 'candidate' && (
                                <button
                                    onClick={() => setShowReportModal(true)}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group/menu"
                                >
                                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 group-hover/menu:text-gray-600 transition-colors duration-200" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4 flex-1">
                    <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Compensation */}
                {compensation && (
                    <div className="mb-4">
                        <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-xl">
                            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="text-green-700 font-bold text-sm">
                                ₹{compensation.toLocaleString()} / year
                            </span>
                        </div>
                    </div>
                )}

                {/* Skills Tags */}
                {Array.isArray(skills) && skills.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {skills.slice(0, 4).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                            {skills.length > 4 && (
                                <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                    +{skills.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Relevancy Score */}
                {relevancy && (
                    <div className="mb-4">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-purple-700">AI Match Score</span>
                                <span className="text-lg font-bold text-purple-800">{Math.round(relevancy)}%</span>
                            </div>
                            <div className="mt-2 bg-purple-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.round(relevancy)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-auto pt-2">
                    {isActive ? (
                        <button
                            onClick={() => onClick(job)}
                            className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex items-center justify-center space-x-2">
                                <span>View Details & Apply</span>
                                <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </button>
                    ) : (
                        <div className="w-full bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-700 font-semibold py-3 px-6 rounded-xl text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>Position No Longer Available</span>
                            </div>
                        </div>
                    )}
                </div>

                <ReportModal
                    isOpen={showReportModal}
                    onClose={() => setShowReportModal(false)}
                    onSubmit={handleReportSubmit}
                />
            </div>
        </div>
    );
};

export default JobCard;