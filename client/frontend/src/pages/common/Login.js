import React, { useState } from 'react';
import loginImage from '../../assets/loginImage.png';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import GithubLoginButton from '../../components/auth/GithubLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, requestResetUserPassword } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import LoadingPage from '../../components/ui/LoadingPage';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { reloadUser } = useUser();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            const data = await loginUser({ email, password });
            const { token, user } = data;
            localStorage.setItem("token", token);
            login(user);
            const firebaseToken = data.firebaseToken;
            if (firebaseToken) {
                await signInWithCustomToken(auth, firebaseToken);
            }
            await reloadUser();
            navigate("/");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className='flex flex-col lg:flex-row h-screen w-full'>
            {loading && <LoadingPage message='signin you in...' />}

            <div className='w-full lg:w-1/2 flex items-center justify-center bg-blue-500 p-4 min-h-screen'>
                
                <img
                    src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
                    alt="App Logo"
                    className="absolute opacity-10 blur-sm object-contain w-3/4 max-w-lg lg:max-w-xl xl:max-w-2xl"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 0,
                    }}
                />

                <div className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md'>
                    <h1 className='font-robotoMono text-black font-semibold text-center mb-4 text-3xl'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='email'
                            placeholder='Email'
                            className='mb-4 p-2 w-full border rounded outline-none text-base'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='mb-2 p-2 w-full border rounded outline-none text-base'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                        <button
                            type='submit'
                            className='bg-blue-500 w-full mt-4 text-white font-bold hover:bg-blue-600 p-2 rounded-3xl'>
                            Login
                        </button>
                    </form>

                    <p className='mt-4 font-robotoMono text-gray-600 text-center'>Or login with</p>


                    <div className='mt-4 flex flex-col sm:flex-row gap-4 w-full justify-center'>
                        <GoogleLoginButton loading={loading} setLoading={setLoading} />
                        <GithubLoginButton loading={loading} setLoading={setLoading} />
                    </div>

                    <div className='text-center mt-4'>
                        <p>
                            Don't have an account?{" "}
                            <Link to="/signup" className='text-blue-700 hover:text-blue-400'>
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <p className='text-sm mt-2 text-center'>
                        <button
                            onClick={() => setShowForgotPassword(true)}
                            className='text-blue-700 hover:text-blue-500 underline'>
                            Forgot Password?
                        </button>
                    </p>
                </div>
            </div>

            {showForgotPassword && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
                        <h2 className='text-lg font-semibold mb-4 text-center'>Reset Password</h2>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className='w-full p-2 border rounded mb-4'
                        />
                        <button
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded'
                            onClick={async () => {
                                try {
                                    await requestResetUserPassword({ email: resetEmail });
                                    setResetStatus('Link sent! Check your email.');
                                } catch (err) {
                                    setResetStatus('Something went wrong.');
                                }
                            }}
                        >
                            Send Reset Link
                        </button>
                        {resetStatus && <p className='text-sm text-center mt-2 text-gray-700'>{resetStatus}</p>}
                        <button
                            className='mt-4 text-blue-700 hover:text-blue-500 block mx-auto'
                            onClick={() => {
                                setShowForgotPassword(false);
                                setResetStatus('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}


            <div className='w-full lg:w-1/2 hidden lg:block'>
                <img src={loginImage} alt='Login Visual' className='h-full w-full object-cover' />
            </div>
        </div>
    );
};

export default Login;
