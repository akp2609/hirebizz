import React, { useState } from 'react';

const JobCard = ({ job, onClick }) => {
    const {
        title,
        description,
        location,
        company,
        skills,
        compensation,
        status,
        relevancy,
        isActive,
        createdAt,
    } = job || {};

    const [showFull, setShowFull] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300">

            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">
                        {(company?.name || 'Unknown Company')} — {location}
                    </p>

                </div>
                <div className="text-sm text-gray-500 text-right">
                    <p>{new Date(createdAt).toLocaleDateString()}</p>
                    {isActive ? (
                        <p className="text-green-600 font-bold">Active</p>
                    ) : (
                        <p className="text-red-600 font-bold">Closed</p>
                    )}
                </div>
            </div>


            <p className={'text-sm text-gray-700 line-clamp-2'}>
                {description}
            </p>
            

            {compensation && (
                <p className="text-green-600 font-medium text-sm mt-2">
                    ₹{compensation.toLocaleString()}
                </p>
            )}


            <div className="flex flex-wrap gap-2 text-xs mt-2 mb-3">
                {Array.isArray(skills) &&
                    skills.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                            {tag}
                        </span>
                    ))}
            </div>

            {relevancy && (
                <p className="text-sm font-bold text-green-600">
                    Relevancy: {Math.round(relevancy)}%
                </p>
            )}


            {isActive ? (
                <button
                    onClick={() => onClick(job)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                    View / Apply
                </button>
            ) : (
                <p className="text-red-600 bg-red-200 text-center rounded-md p-2 text-sm">
                    This Job has been closed.
                </p>
            )}
        </div>
    );
};

export default JobCard;
