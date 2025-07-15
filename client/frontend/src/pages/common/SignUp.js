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
            navigate('/verify-email-sent'); // Redirect after success
        } catch (err) {
            setError(err?.response?.data?.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-full w-full flex justify-center items-center px-4 mt-4'>
            <div
                className='relative w-full sm:w-[60%] md:w-[85%] lg:w-[90%] xl:w-[95%] h-[90vh] bg-cover bg-center
                rounded-xl shadow-xl overflow-hidden mt-2 max-w-7xl opacity-95'
                style={{ backgroundImage: `url(${signupImage})` }}
            >
                <div className='absolute inset-0 bg-black/35' />

                <div className='relative z-10 flex items-center justify-center h-full px-2 mt-4'>
                    <form
                        onSubmit={handleSubmit}
                        className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md'
                    >
                        <h2 className='flex justify-center text-2xl font-robotoMono font-semibold mb-4'>Sign Up</h2>

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
        </div>
    );
}

export default SignUp;
