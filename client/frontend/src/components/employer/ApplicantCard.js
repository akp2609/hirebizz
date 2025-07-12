import React, { useState } from 'react';
import ApplicantModal from './ApplicantModal';

const ApplicantCard = ({ application }) => {
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <div
                className="p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition"
                onClick={() => setOpen(true)}
            >
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
            </div>

            {open && (
                <ApplicantModal
                    applicantName={name}
                    applicantEmail={email}
                    application={application}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default ApplicantCard;
