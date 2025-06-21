import React from 'react';

const ApplicantCard = ({ applicant }) => {
    const { name, email, resumeURL, coverLetter, appliedAt } = applicant;

    return (
        <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="text-md font-semibold">{name}</h4>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-xs text-gray-500 mt-1">Applied on {new Date(appliedAt).toLocaleDateString()}</p>

            {coverLetter && (
                <p className="text-sm mt-2 text-gray-700 italic">"{coverLetter}"</p>
            )}

            {resumeURL && (
                <a
                    href={resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mt-2 inline-block"
                >
                    View Resume
                </a>
            )}
        </div>
    );
};

export default ApplicantCard;
