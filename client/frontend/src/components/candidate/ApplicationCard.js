import React, { useState } from 'react';

const ApplicationCard = ({ application }) => {
    const { job, applicant, coverLetter, status, appliedAt, resumeURL } = application;
    const [showFull, setShowFull] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold">{job.title}</h2>
                    <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
                </div>
                <span className={`text-sm font-medium px-2 py-3 rounded-md ${status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {status}
                </span>
            </div>

            <div>
                <p className={`${!showFull ? 'line-clamp-2' : ''}`}>Cover Letter - {coverLetter}</p>

                {coverLetter.length > 120 && (
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-blue-600 text-xs mt-1 underline"
                    >
                        {showFull ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>



            <div className="mt-2">
                <p className='text-gray-500'>Application by - {applicant.name} ({applicant.email})</p>
                <p className="text-xs text-gray-500">Applied: {new Date(appliedAt).toLocaleDateString()}</p>
                {resumeURL && (
                    <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline mt-1 inline-block"
                    >
                        View Resume
                    </a>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;
