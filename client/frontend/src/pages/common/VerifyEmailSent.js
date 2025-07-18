import React from 'react';
import { Link } from 'react-router-dom';

function VerifyEmailSent() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">📬 Verification Email Sent!</h2>
                <p className="text-gray-700 mb-6">
                    We’ve sent a confirmation link to your email. Please click the link to verify your email before logging in.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Didn’t get the email? Check your spam folder or wait a few minutes.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}

export default VerifyEmailSent;
