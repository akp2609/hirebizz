import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
import { onGoogleLogin } from '../../services/authService';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';

const GoogleLoginButton = () => {
    const { login } = useContext(AuthContext);
    const { reloadUser } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            setLoading(true);

            const { token: appToken, user } = await onGoogleLogin(token);

            localStorage.setItem('token', appToken);
            login(user);
            const firebaseToken = user.firebaseToken;
            if (firebaseToken) {
                await signInWithCustomToken(auth, firebaseToken);
            }
            await reloadUser();
            navigate('/');

        } catch (error) {
            console.error('Google auth failed:', error.response?.data || error.message);
        }

        setLoading(false);
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    return (
        <div className="flex-1 min-w-[150px] flex justify-center bg-black rounded-2xl">
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
