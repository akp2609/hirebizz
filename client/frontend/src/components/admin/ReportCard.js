import React from 'react';

const ReportCard = ({ report, onResolve }) => {
    const { type, contentId, reportedBy, reason, status, createdAt } = report;

    return (
        <div className="border rounded-md p-4 bg-white shadow-sm">
            <div className="flex justify-between space-y-1">
                <div className='space-y-1'>
                    <p className="text-sm text-gray-700">
                        <strong className='text-red-500'>Type - {type}</strong><br></br> reported by <button className='text-blue-500'>{reportedBy}</button>
                    </p>
                    <p className="text-xs text-gray-500">{reason}</p>
                    <p className="text-xs  text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className='space-x-1 space-y-1 items-center'>
                    {status === 'pending' ? (
                        <>
                            <button className='text-sm font-medium px-2 py-3 rounded-md bg-green-100 text-green-700'>Mark as safe</button>
                            <button className='bg-red-100 text-red-700 text-sm font-medium px-2 py-3 rounded-md'>Delete {type}</button>

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
            </div>

            <button
                onClick={() => onResolve(report._id)}
                className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded"
            >
                View Details
            </button>
        </div>
    );
};

export default ReportCard;
