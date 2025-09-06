import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetUserPassword } from '../../services/authService';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleReset = async () => {
        if (newPassword !== confirmPassword) {
            setStatus('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await resetUserPassword({ token, newPassword });
            setStatus('Password reset successfully!');
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setStatus('Reset failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 relative overflow-hidden p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className='bg-white/10 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md relative overflow-hidden z-10'>
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <img
                            src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
                            alt="HireBizz Logo"
                            className="h-16 w-auto object-contain filter drop-shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur-xl -z-10"></div>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Shield className="text-emerald-400" size={32} />
                        <h2 className='font-bold text-white text-3xl bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent'>
                            Reset Password
                        </h2>
                    </div>
                    <p className="text-white/70 text-lg">Create a new secure password</p>
                </div>

                <div className="space-y-6">
                    {/* New Password Input */}
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors duration-300" size={20} />
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder='New Password'
                            className='w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300 text-lg'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-emerald-400 transition-colors duration-300"
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors duration-300" size={20} />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            className='w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300 text-lg'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-emerald-400 transition-colors duration-300"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newPassword && (
                        <div className="space-y-2">
                            <div className="flex gap-1">
                                <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-white/20'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-emerald-500' : 'bg-white/20'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${/\d/.test(newPassword) ? 'bg-emerald-500' : 'bg-white/20'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'bg-emerald-500' : 'bg-white/20'}`}></div>
                            </div>
                            <p className="text-white/60 text-xs text-center">
                                Password strength: {
                                    [
                                        newPassword.length >= 8,
                                        /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
                                        /\d/.test(newPassword),
                                        /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                                    ].filter(Boolean).length >= 3 ? 'Strong' :
                                    [
                                        newPassword.length >= 8,
                                        /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
                                        /\d/.test(newPassword),
                                        /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                                    ].filter(Boolean).length >= 2 ? 'Medium' : 'Weak'
                                }
                            </p>
                        </div>
                    )}

                    {/* Status Message */}
                    {status && (
                        <div className={`rounded-2xl p-4 border ${
                            success 
                                ? 'bg-emerald-500/20 border-emerald-500/30' 
                                : status.includes('match') 
                                    ? 'bg-yellow-500/20 border-yellow-500/30'
                                    : 'bg-red-500/20 border-red-500/30'
                        }`}>
                            <div className="flex items-center gap-2 justify-center">
                                {success ? (
                                    <CheckCircle className="text-emerald-300" size={20} />
                                ) : (
                                    <AlertCircle className={status.includes('match') ? 'text-yellow-300' : 'text-red-300'} size={20} />
                                )}
                                <p className={`text-sm ${
                                    success 
                                        ? 'text-emerald-200' 
                                        : status.includes('match') 
                                            ? 'text-yellow-200'
                                            : 'text-red-200'
                                }`}>
                                    {status}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        disabled={loading || success}
                        className='w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-4 rounded-2xl hover:from-emerald-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Resetting password...
                            </div>
                        ) : success ? (
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle size={20} />
                                Password Reset!
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Shield size={20} />
                                Reset Password
                            </div>
                        )}
                    </button>
                </div>

                {/* Security Tips */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-white font-semibold text-sm mb-3 text-center">Security Tips:</h3>
                    <div className="space-y-2 text-xs text-white/60">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <span>Use at least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <span>Mix uppercase and lowercase letters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <span>Include numbers and special characters</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
