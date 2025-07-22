import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetUserPassword } from '../../services/authService';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleReset = async () => {
        if (newPassword !== confirmPassword) {
            setStatus('Passwords do not match.');
            return;
        }
        try {
            await resetUserPassword({ token, password: newPassword });
            setStatus('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setStatus('Reset failed. Try again.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center mb-4 text-gray-700'>Reset Your Password</h2>
                <input
                    type='password'
                    placeholder='New Password'
                    className='w-full p-2 border rounded mb-4'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    className='w-full p-2 border rounded mb-4'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={handleReset}
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
                >
                    Reset Password
                </button>
                {status && <p className='text-sm mt-3 text-center text-gray-700'>{status}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
