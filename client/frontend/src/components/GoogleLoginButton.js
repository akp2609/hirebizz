import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'

const GoogleLoginButton = () => {

    const [loading, setLoading] = useState(false);

    const handleGoogleLoginSuccess = async (credentialResponse) => {

        const token = credentialResponse.credential;

        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await res.json();
            console.log('Server Response:', data);
        } catch (error) {
            console.error('Authentication error', error);
        }
        setLoading(false);
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    }

    return (

        <div>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                theme='filled_black'
                size='medium'
                shape='pill' />
        </div>
    )
}

export default GoogleLoginButton
