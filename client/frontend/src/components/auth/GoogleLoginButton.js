import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';

const GoogleLoginButton = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            setLoading(true);
            const decoded = jwtDecode(token);

            console.log('Decoded user info:', decoded);

            login({
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                token: token,
                provider: 'google',
            });

        } catch (error) {
            console.error('Authentication error', error);
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
                theme='filled_black'
                size='medium'
                shape='pill'
                width="100%"
            />
        </div>
    );
};

export default GoogleLoginButton;
