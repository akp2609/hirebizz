import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Github } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        console.log('Login submitted:', { email, password });
    };

    return (
        <div className='flex flex-col lg:flex-row h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden'>

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>


            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 min-h-screen relative z-10'>
                <div className='bg-white/10 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md relative overflow-hidden'>


                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <img
                                src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
                                alt="HireBizz Logo"
                                className="h-16 w-auto object-contain filter drop-shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur-xl -z-10"></div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className='font-bold text-white text-4xl mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                            Welcome Back
                        </h1>
                        <p className="text-white/70 text-lg">Sign in to your account</p>
                    </div>

                    <div onSubmit={handleSubmit} className="space-y-6">

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                            <input
                                type='email'
                                placeholder='Email Address'
                                className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-lg'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>


                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-lg'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-blue-400 transition-colors duration-300"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                                <p className="text-red-200 text-sm text-center">{error}</p>
                            </div>
                        )}


                        <button
                            type='submit'
                            disabled={loading}
                            onClick={handleSubmit}
                            className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : 'Sign In'}
                        </button>
                    </div>


                    <div className="flex items-center my-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <span className="px-4 text-white/70 text-sm font-medium">Or continue with</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>


                    <div className='flex gap-4'>
                        <button className='flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] group'>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">G</span>
                                </div>
                                <span className="text-white font-medium group-hover:text-blue-200 transition-colors">Google</span>
                            </div>
                        </button>

                        <button className='flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] group'>
                            <div className="flex items-center justify-center gap-2">
                                <Github className="text-white" size={20} />
                                <span className="text-white font-medium group-hover:text-blue-200 transition-colors">GitHub</span>
                            </div>
                        </button>
                    </div>


                    <div className='text-center mt-8 space-y-3'>
                        <p className="text-white/70">
                            Don't have an account?{" "}
                            <button className='text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline'>
                                Sign up
                            </button>
                        </p>

                        <button
                            onClick={() => setShowForgotPassword(true)}
                            className='text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline font-medium'
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>


            {showForgotPassword && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md relative overflow-hidden'>
                        <div className="text-center mb-6">
                            <h2 className='text-2xl font-bold text-white mb-2'>Reset Password</h2>
                            <p className="text-white/70">Enter your email to receive a reset link</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/15 transition-all duration-300'
                                />
                            </div>

                            <button
                                className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-2xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/25'
                                onClick={async () => {

                                    setResetStatus('Reset link sent! Check your email.');
                                }}
                            >
                                Send Reset Link
                            </button>

                            {resetStatus && (
                                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                                    <p className='text-green-200 text-sm text-center'>{resetStatus}</p>
                                </div>
                            )}

                            <button
                                className='w-full text-white/70 hover:text-white transition-colors duration-300 py-2'
                                onClick={() => {
                                    setShowForgotPassword(false);
                                    setResetStatus('');
                                    setResetEmail('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className='w-full lg:w-1/2 hidden lg:block relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt='Modern Office Space'
                    className='h-full w-full object-cover transform scale-110 hover:scale-100 transition-transform duration-700'
                />


                <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white text-xl font-bold mb-4">Trusted by professionals</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-400">10K+</div>
                                <div className="text-white/70 text-sm">Active Users</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-400">500+</div>
                                <div className="text-white/70 text-sm">Companies</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-400">95%</div>
                                <div className="text-white/70 text-sm">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {loading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <p className="text-white text-lg font-medium">Signing you in...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;