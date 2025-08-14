import React, { useState } from 'react';
import ApplicantModal from './ApplicantModal';
import { useNavigate } from "react-router-dom";
import ReportModal from '../common/ReportModal';
import { postReport } from '../../services/reportService';


const ApplicantCard = ({ application, onStatusChange }) => {
    const [open, setOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleReportSubmit = async({ reason, details }) => {
        try {
            const formData = {
                targetId: application.applicant._id,
                targetType: 'user',
                reason,
                details,
            }
            await postReport(formData);
            setReportOpen(false);
            alert("✅ Report submitted successfully!");
        } catch (err) {
            console.error("❌ Report submission failed:", err.message);
        }
    }

    return (
        <>
            <div
                className="relative p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition"
                onClick={() => setOpen(true)}
            >

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setReportOpen(true);
                    }}
                    className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
                >
                    Report
                </button>


                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-xs text-gray-500">
                    Applied: {appliedAt ? new Date(appliedAt).toLocaleDateString() : 'Unknown'}
                </p>
                <p className="text-xs text-gray-600 mt-1">Status: {status}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                    className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                    View Details
                </button>

                {status === "accepted" && (
                    <button
                        onClick={handleMessageClick}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ml-4"
                    >
                        Message Applicant
                    </button>
                )}
            </div>


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