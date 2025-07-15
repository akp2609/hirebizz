import React, { useState } from 'react';
import loginImage from '../../assets/loginImage.png';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import GithubLoginButton from '../../components/auth/GithubLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const {reloadUser} = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await loginUser({ email, password });
            const { token, user } = data;

            localStorage.setItem("token", token);
            login(user);
            await reloadUser();
            navigate("/");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className='flex h-screen'>


            <div className='flex justify-center items-center w-1/2 h-screen bg-blue-500'>

                <div className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md'>
                    <h1 className='font-robotoMono text-black font-semibold flex justify-center m-2 text-3xl'>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            type='email'
                            placeholder='Email'
                            className='mb-4 mt-2 p-2 w-full border rounded outline-none text-xl'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type='password'
                            placeholder='Password'
                            className='mb-2 p-2 w-full border rounded outline-none text-xl'
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

                    <p className='mt-4 font-robotoMono text-gray-600 flex justify-center'>Or login with</p>

                    <div className='mt-4 flex justify-between items-center'>
                        <GoogleLoginButton />
                        <GithubLoginButton />
                    </div>

                    <div className='flex justify-center items-center mt-4'>
                        <p>Don't have an account? <Link to="/signup" className='text-blue-700 hover:text-blue-400'>Sign up</Link></p>
                    </div>
                </div>

            </div>


            <div className='relative justify-center items-center w-1/2'>
                <img src={loginImage} alt='Login Visual' className='h-screen opacity-80 p-1 w-full object-cover' />
            </div>

        </div>
    );
};

export default Login;
