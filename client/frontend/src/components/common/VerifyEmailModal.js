import React, { useState } from 'react';


const VerifyEmailModal = ({ isOpen, onClose, email, onSubmit }) => {
    const [inputEmail, setInputEmail] = useState(email || '');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Verify Your Email</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Please confirm your corporate email to begin verification.
                </p>
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onClose}
                        className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(inputEmail)}
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};


export default VerifyEmailModal;
