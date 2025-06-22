import React, { useState } from 'react'

const JobCard = ({ job, onViewClick }) => {


    const { title, description, location, company, skills, compensation, status, isActive, createdBy, createdAt } = job || {};

    const [showFull, setShowFull] = useState(false);
    return (
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-start mb-2 space-y-1">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{company.name} — {location}</p>

                </div>
                <div className="text-sm text-gray-500 justify-center items-center flex">
                    <div className='items-center justify-center'>
                        {new Date(createdAt).toLocaleDateString()}
                        {isActive ?
                            <p className='text-green-600 text-sm font-bold'>Active</p> :
                            <p className='text-red-600 text-sm font-bold'>Closed</p>}</div>
                </div>
            </div>

            <div className="my-2" />

            <p className={`text-sm text-gray-700 ${!showFull ? 'line-clamp-2' : ''}`}>
                {description}
            </p>

            {description && description.length > 120 && (
                <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-blue-600 text-xs mt-1 underline"
                >
                    {showFull ? 'Show less' : 'Show more'}
                </button>
            )}

            {compensation && (
                <p className="text-green-600 font-medium text-sm mb-2">₹{compensation.toLocaleString()}</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs mb-3">
                {Array.isArray(job?.skills) && job.skills?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs inline-block mr-2 mb-1"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {isActive ?
                <button
                    onClick={() => onViewClick(job)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                    View / Apply
                </button> : <p className='text-red-600 bg-red-200 text-center rounded-md p-2'>This Job has been closed.</p>}
        </div>
    )
}

export default JobCard
