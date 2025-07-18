import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from "../../services/authService";


const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); 
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const handleVerify = async () => {
            try {
                const res = await verifyEmail(token);
                setStatus('success');
                setMessage(res.message || 'Email verified successfully!');
                setTimeout(() => navigate('/'), 3000); 
            } catch (err) {
                console.error('❌ Email verification failed:', err.response?.data || err.message);
                setStatus('error');
                setMessage(
                    err.response?.data?.message ||
                    'Verification link is invalid or expired. Please request a new one.'
                );
            }
        };

        if (token) handleVerify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-gray-50">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
                <p className={`text-base ${status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
                    {message}
                </p>

                {status === 'success' && (
                    <p className="text-sm text-green-600 mt-4">Redirecting to home...</p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;