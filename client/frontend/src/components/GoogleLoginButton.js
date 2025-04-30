import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {jwtDecode} from 'jwt-decode'

const GoogleLoginButton = () => {

    const {login} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);

    const handleGoogleLoginSuccess = async (credentialResponse) => {

        const token = credentialResponse.credential;

        try {
            setLoading(true);

            const decoded = jwtDecode(token)
            console.log('Decoded user info: ',decoded)

            // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ token }),
            // });

            // console.log(res)
            // if (!res.ok) {
            //     throw new Error('Failed to authenticate');
            // }

            // const data = await res.json();
            // console.log('Server Response:', data);

            login({
                name:decoded.name,
                email:decoded.email,
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
