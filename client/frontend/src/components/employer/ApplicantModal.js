const ApplicantModal = ({ applicantName ,
    applicantEmail , application, onClose }) => {
    if (!application || typeof application !== 'object') return null;

    const {

        resumeURL,
        coverLetter,
        status
    } = application;

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
                    <p className="text-sm text-gray-400 italic">No resume available.</p>
                )}

                <div className="mt-4">
                    <h3 className="font-semibold mb-1">Cover Letter:</h3>
                    <p className="text-sm text-gray-700">
                        {coverLetter || 'No cover letter provided.'}
                    </p>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded">Accept</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ApplicantModal;
