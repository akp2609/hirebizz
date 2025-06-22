import React from 'react';

const ApplicantCard = ({ applicant }) => {
    const { name, email, resumeURL, coverLetter, status, appliedAt } = applicant;

    return (
        <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-2 space-y-1">
                <div><h4 className="text-md font-semibold">{name}</h4>
                    <p className="text-sm text-gray-600">{email}</p></div>


                <div className='space-y-1'>
                    <div className='space-x-1'>

                        {status === 'pending' ? (
                            <>
                                <button className='text-sm font-medium px-2 py-3 rounded-md bg-green-100 text-green-700'>Accept</button>
                                <button className='bg-red-100 text-red-700 text-sm font-medium px-2 py-3 rounded-md'>Reject</button>

                            </>
                        ) : (
                            <>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {status}
                                </span>
                                <button className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
                                    Message
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Applied on {new Date(appliedAt).toLocaleDateString()}</p>
                </div>
            </div>


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
