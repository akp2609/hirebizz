import React, { useState, useEffect } from 'react';
import { Mail, Shield, CheckCircle, X, Building2, ArrowRight } from 'lucide-react';

const VerifyEmailModal = ({ isOpen, onClose, email, onSubmit }) => {
    const [inputEmail, setInputEmail] = useState(email || '');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setInputEmail(email || '');
        } else {
            setIsAnimating(false);
        }
    }, [isOpen, email]);

    const handleSubmit = () => {
        if (inputEmail.trim()) {
            onSubmit(inputEmail);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`
                relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 
                ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            `}>
                {/* Header Section */}
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-3xl p-8 pb-6 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Icon and Title */}
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
                            <div className="relative">
                                <Mail className="w-8 h-8 text-white" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-2 h-2 text-white" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Confirm your corporate email address to unlock premium features and secure your account
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-6">
                    {/* Benefits List */}
                    <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                            <span>Access to exclusive job opportunities</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-3 h-3 text-blue-600" />
                            </div>
                            <span>Corporate account verification</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Shield className="w-3 h-3 text-purple-600" />
                            </div>
                            <span>Enhanced account security</span>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Corporate Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                                placeholder="Enter your corporate email"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        {/* Email Format Hint */}
                        <p className="mt-2 text-xs text-gray-500">
                            💡 Use your company email (e.g., name@company.com)
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!inputEmail.trim()}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span>Verify Email</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">
                                    Your privacy is protected
                                </p>
                                <p className="text-xs text-blue-700">
                                    We use industry-standard encryption to keep your information secure and never share your email with third parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailModal;