import React, { useEffect, useState } from 'react';
import { getRefreshedResumeUrl } from '../../services/applicationService';

const ApplicationCard = ({ application }) => {
    const { job, coverLetter, status, appliedAt, resumePath } = application;
    const [showFull, setShowFull] = useState(false);
    const [resumeURL, setResumeURL] = useState(null);
    const [loadingResume, setLoadingResume] = useState(false);

    useEffect(() => {
        const fetchResumeUrl = async () => {
            if (resumeURL || !application.resumePath) return;
            setLoadingResume(true);
            try {
                const resume = await getRefreshedResumeUrl(application.resumePath);
                setResumeURL(resume);
            } catch (err) {
                console.log('error refreshing resume url for applicantion',err);
            }
            setLoadingResume(false);
        }

        fetchResumeUrl();
    }, [application.resumePath,resumeURL])

    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <div className="flex justify-between space-y-1">
                <div>
                    <h2 className="text-lg font-bold">{job.title}</h2>
                    <p className="text-sm text-gray-600"> {job.company?.name || "Unknown Company"}— {job.location || "Location not specified"}</p>
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

            <div className="mt-2">
                <p className={`${!showFull ? 'line-clamp-2' : ''}`}>
                    <strong>Cover Letter:</strong> {coverLetter}
                </p>

                {coverLetter.length > 120 && (
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-blue-600 text-xs mt-1 underline"
                    >
                        {showFull ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>

            <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-500">Applied: {new Date(appliedAt).toLocaleDateString()}</p>
                {resumeURL && (
                    <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline"
                    >
                        View Resume
                    </a>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;
