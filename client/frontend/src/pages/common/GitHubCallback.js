import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { githubLogin, onGithubLogin } from '../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import LoadingPage from '../../components/ui/LoadingPage';
import { analyticsRecordLogin } from '../../services/analyticsService';

const GitHubCallback = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { reloadUser } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const exchangeCodeForToken = async () => {
            setLoading(true);
            try {
                const { token, user } = await onGithubLogin(code);
                if (!token) {
                    throw new Error('No token received');
                }   
                if (!user) {
                    throw new Error('No user data received');
                }
                
                console.log("token", token)
                localStorage.setItem('token', token);
                login(user);
                await analyticsRecordLogin('web', user._id);
                const firebaseToken = user.firebaseToken;
                if (firebaseToken) {
                    await signInWithCustomToken(auth, firebaseToken);
                }
                await reloadUser();

                navigate('/');
            } catch (error) {
                console.error('GitHub OAuth failed', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            exchangeCodeForToken();
        } else {
            navigate('/login');
        }
    }, [login, reloadUser, navigate]);

    

    return (
        <div className="text-center py-10 text-gray-600">
            { loading && <LoadingPage message='signin you in...' /> }
            Logging you in via GitHub...
        </div>
    );
};

export default GitHubCallback;
