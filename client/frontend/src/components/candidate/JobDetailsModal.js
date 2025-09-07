import React, { useEffect, useState } from "react";
import { MapPin, Building2, DollarSign, Sparkles, CheckCircle, Send } from "lucide-react";
import ModalWrapper from "../common/ModalWrapper";
import ApplyJobModal from "./ApplyJobModal";
import { useUser } from "../../context/UserContext";

const JobDetailsModal = ({ job, isOpen, onClose, isAdminView = false }) => {
    const [applyOpen, setApplyOpen] = useState(false);
    const { user } = useUser();

    if (!isOpen || !job) return null;

    return (
        <>
            <ModalWrapper
                isOpen={isOpen}
                onClose={onClose}
                title=""
                maxWidth="max-w-4xl"
            >
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 rounded-t-2xl -m-6 mb-0 p-8">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                    {job.title}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium">{job.company?.name || "Unknown Company"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-500" />
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Compensation Badge */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5" />
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Compensation</p>
                                        <p className="text-xl font-bold">₹{job.compensation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-8">
                    {/* Job Description */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {job.description}
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    {job.skills?.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Required Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {job.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 
                                                 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium text-blue-700
                                                 transition-all duration-200 hover:shadow-md hover:scale-105 cursor-default"
                                    >
                                        <span className="relative z-10">{skill}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 
                                                      group-hover:from-blue-400/10 group-hover:to-purple-400/10 rounded-full transition-all duration-200"></div>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Apply Section */}
                    {!isAdminView && (
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Ready to apply?</h4>
                                    <p className="text-gray-600">Take the next step in your career journey</p>
                                </div>
                                
                                {user?.appliedJobs?.includes(job._id.toString()) ? (
                                    <div className="flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-xl border border-green-200">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">Application Submitted</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setApplyOpen(true)}
                                        className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                                                 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl 
                                                 transition-all duration-200 transform hover:scale-105 active:scale-95"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                            <span>Apply Now</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-xl opacity-0 
                                                      group-hover:opacity-100 transition-opacity duration-200"></div>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </ModalWrapper>

            {!isAdminView && job && job._id && (
                <ApplyJobModal
                    isOpen={applyOpen}
                    onClose={() => setApplyOpen(false)}
                    jobId={job?._id}
                />
            )}
        </>
    );
};

export default JobDetailsModal;