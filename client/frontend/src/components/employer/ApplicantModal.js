import { getRefreshedResumeUrl, updateApplicationStatus } from "../../services/applicationService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ApplicantModal = ({ applicantName, applicantEmail, application, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [resumeURL, setResume] = useState('')

    useEffect(() => {
        const getApplicantResumeUrl = async () => {
            setLoading(true);
            try {
                const res = await getRefreshedResumeUrl(applicationId);
                setResume(res);
            } catch (err) {
                console.error('Failed to fetch applicant refreshed resume', err);
            } finally {
                setLoading(false);
            }
        }

        getApplicantResumeUrl()
    }, [])


    if (!application || typeof application !== 'object') return null;

    const { _id: applicationId, resumeObject, coverLetter, status } = application;

    const handleStatusUpdate = async (newStatus) => {
        try {
            setLoading(true);
            const data = await updateApplicationStatus(applicationId, { status: newStatus });
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-2">{applicantName}</h2>
                <p className="text-sm text-gray-600 mb-2">{applicantEmail}</p>

                {resumeURL ? (
                    <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                    >
                        View Resume
                    </a>
                ) : (
                    <p className="text-sm text-gray-400 italic">loading resume...</p>
                )}

                <div className="mt-4">
                    <h3 className="font-semibold mb-1">Cover Letter:</h3>
                    <p className="text-sm text-gray-700">
                        {coverLetter || 'No cover letter provided.'}
                    </p>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    {status === 'pending' | 'reviewed' ? (
                        <div>
                            <button
                                onClick={() => handleStatusUpdate("accepted")}
                                disabled={loading}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleStatusUpdate("rejected")}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Reject
                            </button>

                        </div>
                    ) : (
                        <div>
                            <p className={`text-white mt-2 ${status.toLowerCase() === 'accepted' ? 'bg-green-600' : 'bg-red-600'}`}>{status}</p>
                        </div>
                    )}

                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApplicantModal;
