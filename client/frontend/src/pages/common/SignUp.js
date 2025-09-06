import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building2, CheckCircle } from 'lucide-react';
import signupImage from '../../assets/signupImage.png';
import { postUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [isEmployer, setIsEmployer] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate'
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { name, email, password } = formData;
            const role = isEmployer ? 'employer' : 'candidate';
            await postUser({ name, email, password, role });
            navigate('/verify-email-sent');
        } catch (err) {
            setError(err?.response?.data?.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col lg:flex-row h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden'>

            
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg blur-xl -z-10"></div>
                        </div>
                    </div>

                    
                    <div className="text-center mb-8">
                        <h2 className='font-bold text-white text-4xl mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent'>
                            Join HireBizz
                        </h2>
                        <p className="text-white/70 text-lg">Create your account to get started</p>
                    </div>

                    
                    <form onSubmit={handleSubmit} className="space-y-6">

                        
                        <div className="flex gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => setIsEmployer(false)}
                                className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${!isEmployer
                                    ? 'border-blue-400 bg-blue-500/20 text-white shadow-lg shadow-blue-500/25'
                                    : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <User size={20} />
                                    <span className="font-medium">Candidate</span>
                                </div>
                                <p className="text-xs mt-1 opacity-75">Looking for opportunities</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsEmployer(true)}
                                className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${isEmployer
                                    ? 'border-purple-400 bg-purple-500/20 text-white shadow-lg shadow-purple-500/25'
                                    : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Building2 size={20} />
                                    <span className="font-medium">Employer</span>
                                </div>
                                <p className="text-xs mt-1 opacity-75">Hiring talent</p>
                            </button>
                        </div>

                        
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors duration-300" size={20} />
                            <input
                                type='text'
                                name='name'
                                placeholder='Full Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 text-lg'
                            />
                        </div>

                        
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors duration-300" size={20} />
                            <input
                                type='email'
                                name='email'
                                placeholder='Email Address'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 text-lg'
                            />
                        </div>

                        
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors duration-300" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Create Password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className='w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 text-lg'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-purple-400 transition-colors duration-300"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                                <p className="text-red-200 text-sm text-center">{error}</p>
                            </div>
                        )}

                        
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating account...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Create Account</span>
                                    <CheckCircle size={20} />
                                </div>
                            )}
                        </button>
                    </form>

                    
                    <div className='text-center mt-8'>
                        <p className="text-white/70">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className='text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline'
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                    
                    <div className="text-center mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/50 text-xs">
                            By creating an account, you agree to our{" "}
                            <button className="text-purple-400 hover:text-purple-300 underline">Terms of Service</button>
                            {" "}and{" "}
                            <button className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</button>
                        </p>
                    </div>
                </div>
            </div>

            
            <div className='w-full lg:w-1/2 hidden lg:block relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 z-10"></div>
                <img
                    src={signupImage}
                    alt='Signup Visual'
                    className='h-full w-full object-cover transform scale-110 hover:scale-100 transition-transform duration-700'
                />

                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white text-xl font-bold mb-4">Why choose HireBizz?</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                                <span className="text-white/90 text-sm">Connect with top employers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                                <span className="text-white/90 text-sm">AI-powered job matching</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
                                <span className="text-white/90 text-sm">Real-time collaboration tools</span>
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
                            <p className="text-white text-lg font-medium">Creating your account...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;
