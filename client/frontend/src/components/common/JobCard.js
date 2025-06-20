import React from 'react'

const JobCard = ({ job, onViewClick }) => {
    const { title, description, location, company, skills, compensation, status, createdBy, createdAt } = job;
    return (
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{company} — {location}</p>
                </div>
                <div className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</div>
            </div>

            {compensation && (
                <p className="text-green-600 font-medium text-sm mb-2">₹{compensation.toLocaleString()}</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs mb-3">
                {skills.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <button
                onClick={() => onViewClick(job)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
                View / Apply
            </button>
        </div>
    )
}

export default JobCard
