import React, { useState } from 'react';

const REPORT_REASONS = [
    "Spam or scam",
    "Inappropriate content",
    "Incorrect job information",
    "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = () => {
        if (!reason) return alert("Please select a reason.");
        onSubmit({ reason, details });
        setReason('');
        setDetails('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">Report Job</h2>

                <label className="text-sm font-medium">Reason</label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border rounded-md p-2 mt-1 mb-4"
                >
                    <option value="">-- Select a reason --</option>
                    {REPORT_REASONS.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                    ))}
                </select>

                <label className="text-sm font-medium">Additional Details</label>
                <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full border rounded-md p-2 mt-1 mb-4 resize-none"
                    placeholder="Add any other info you feel is necessary..."
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                    >
                        Submit Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
