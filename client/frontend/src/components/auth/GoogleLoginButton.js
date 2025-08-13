import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
import { onGoogleLogin } from '../../services/authService';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import LoadingPage from '../ui/LoadingPage';
import { analyticsRecordLogin } from '../../services/analyticsService';

const GoogleLoginButton = ({loading,setLoading}) => {
    const { login } = useContext(AuthContext);
    const { reloadUser } = useUser();
    const navigate = useNavigate();
   

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            setLoading(true);

            const { token: appToken, user } = await onGoogleLogin(token);

            if (!appToken) {
                throw new Error('No token received');
            }   

            if (!user) {
                throw new Error('No user data received');
            }

            

            localStorage.setItem('token', appToken);
            login(user);
            await analyticsRecordLogin('web', user._id);
            const firebaseToken = user.firebaseToken;
            if (firebaseToken) {
                await signInWithCustomToken(auth, firebaseToken);
            }
            await reloadUser();
            navigate('/');

        } catch (error) {
            console.error('Google auth failed:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    

    return (
        <div className="flex-1 min-w-[150px] flex justify-center bg-black rounded-2xl">
            {/* { loading && <LoadingPage message='signin you in...' /> } */}
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                theme="filled_black"
                size="medium"
                shape="pill"
                width="100%"
            />
        </div>
    );
};

export default GoogleLoginButton;
