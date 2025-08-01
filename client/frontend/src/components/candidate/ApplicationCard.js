import React, { useEffect, useState } from 'react';
import { getRefreshedResumeUrl } from '../../services/applicationService';
import { withdrawJobApplication } from '../../services/applicationService';
import { toast } from 'react-hot-toast';

const ApplicationCard = ({id, application, onWithdraw }) => {
    const { job, coverLetter, status, appliedAt, resumeObject, _id: applicationId } = application;

    const [showFull, setShowFull] = useState(false);
    const [resumeURL, setResumeURL] = useState(null);
    const [loadingResume, setLoadingResume] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchResumeUrl = async () => {
            if (!resumeObject) return;

            setLoadingResume(true);
            try {
                const resume = await getRefreshedResumeUrl(applicationId);
                if (isMounted && resume) {
                    setResumeURL(resume);
                }
            } catch (err) {
                if (isMounted) console.error(err);
            } finally {
                if (isMounted) setLoadingResume(false);
            }
        };

        fetchResumeUrl();

        return () => {
            isMounted = false;
        };
    }, [applicationId, resumeObject]);

    const handleWithdraw = async () => {
        if (!window.confirm("Are you sure you want to withdraw this application?")) return;
        setWithdrawing(true);
        try {
            await withdrawJobApplication(id);
            toast.success("Application withdrawn");
            onWithdraw?.(id); 
        } catch (err) {
            toast.error("Failed to withdraw");
            console.error(err);
        } finally {
            setWithdrawing(false);
        }
    };

    if (!job || !job.title) {
        return (
            <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-600">
                <p className="text-sm">⚠️ This job posting may have been removed.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition space-y-2">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold">{job.title}</h2>
                    <p className="text-sm text-gray-600">
                        {job.company?.name || "Unknown Company"} — {job.location || "Location not specified"}
                    </p>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {status}
                </span>
            </div>

            <div>
                <p className={!showFull ? 'line-clamp-2' : ''}>
                    <strong>Cover Letter:</strong> {coverLetter}
                </p>
                {coverLetter?.length > 120 && (
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-blue-600 text-xs mt-1 underline"
                    >
                        {showFull ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleWithdraw}
                        disabled={withdrawing}
                        className="text-red-600 bg-red-100 hover:bg-red-200 px-2 py-1 rounded text-xs font-medium"
                    >
                        {withdrawing ? "Withdrawing..." : "Withdraw"}
                    </button>

                    <span>Applied: {new Date(appliedAt).toLocaleDateString()}</span>
                </div>

                {loadingResume ? (
                    <p className="italic text-gray-400">Loading resume...</p>
                ) : resumeURL ? (
                    <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        View Resume
                    </a>
                ) : (
                    <p className="text-red-500 italic">Resume not available</p>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;
