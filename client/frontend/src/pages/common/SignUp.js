import React, { useState } from 'react';
import signupImage from '../../assets/signupImage.png';
import { postUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
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
            await postUser({ name, email, password });
            navigate('/verify-email-sent');
        } catch (err) {
            setError(err?.response?.data?.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col lg:flex-row h-screen w-full'>
            <div className='w-full lg:w-1/2 flex items-center justify-center bg-blue-600 p-4'>
                <div className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md'>
                    <h2 className='text-2xl font-robotoMono font-semibold mb-4 text-center'>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='name'
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='mb-2 p-2 w-full border rounded outline-none'
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='mb-2 p-2 w-full border rounded outline-none'
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Create password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='mb-4 p-2 w-full border rounded outline-none'
                        />
                        {error && <p className='text-red-500 text-sm mb-2 text-center'>{error}</p>}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-600 disabled:opacity-50'
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
            <div className='w-full lg:w-1/2 hidden lg:block'>
                <img src={signupImage} alt='Signup Visual' className='h-full w-full object-cover' />
            </div>
        </div>
    );
}

export default SignUp;
