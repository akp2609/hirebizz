import React from 'react';

const ReportCard = ({ report, onResolve }) => {
    const { type, contentId, reportedBy, reason, createdAt } = report;

    return (
        <div className="border rounded-md p-4 bg-white shadow-sm">
            <div className="flex justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        <strong>{type}</strong> reported by <strong>{reportedBy.name}</strong>
                    </p>
                    <p className="text-xs text-gray-500">{reason}</p>
                </div>
                <p className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <button
                onClick={() => onResolve(report._id)}
                className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded"
            >
                Resolve
            </button>
        </div>
    );
};

export default ReportCard;
