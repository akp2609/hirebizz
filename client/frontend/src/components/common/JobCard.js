import React, { useEffect, useState } from 'react';
import BookmarkIcon from './BookmarkIcon';
import { saveJob, deleteUserSavedJob } from '../../services/userService';

const JobCard = ({ job, onClick, isSaved: initiallySaved = false }) => {
    const {
        _id,
        title,
        description,
        location,
        company,
        skills,
        compensation,
        relevancy,
        isActive,
        createdAt,
    } = job || {};

    const [isSaved, setIsSaved] = useState(initiallySaved);
    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        setIsSaved(initiallySaved);
    }, [initiallySaved]);

    const handleToggleSave = async () => {
        try {
            setLoadingSave(true);
            if (isSaved) {
                await deleteUserSavedJob(_id);
                setIsSaved(false);
            } else {
                await saveJob(_id);
                setIsSaved(true);
            }
        } catch (err) {
            console.error("❌ Save toggle failed:", err.message);
        } finally {
            setLoadingSave(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                        <BookmarkIcon isSaved={isSaved} onClick={handleToggleSave} />
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                        {(company?.name || 'Unknown Company')} — {location}
                    </p>
                </div>
                <div className="text-right text-xs text-gray-500 min-w-max">
                    <p>{new Date(createdAt).toLocaleDateString()}</p>
                    <p className={isActive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {isActive ? 'Active' : 'Closed'}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 line-clamp-2 mb-2">{description}</p>

            {/* Compensation */}
            {compensation && (
                <p className="text-green-600 font-medium text-sm mb-2">
                    ₹{compensation.toLocaleString()}
                </p>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-2 text-xs mb-3">
                {Array.isArray(skills) &&
                    skills.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full max-w-full truncate"
                        >
                            {tag}
                        </span>
                    ))}
            </div>

            {/* Relevancy */}
            {relevancy && (
                <p className="text-sm font-bold text-green-600 mb-2">
                    Relevancy: {Math.round(relevancy)}%
                </p>
            )}

            {/* Action */}
            {isActive ? (
                <button
                    onClick={() => onClick(job)}
                    className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm w-full"
                >
                    View / Apply
                </button>
            ) : (
                <p className="text-red-600 bg-red-100 text-center rounded-md py-2 text-sm">
                    This Job has been closed.
                </p>
            )}
        </div>
    );
};

export default JobCard;
