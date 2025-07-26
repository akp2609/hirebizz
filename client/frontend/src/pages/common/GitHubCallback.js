import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { githubLogin, onGithubLogin } from '../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const GitHubCallback = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { reloadUser } = useUser();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const exchangeCodeForToken = async () => {
            try {
                const { token, user } = await onGithubLogin(code);
                console.log("token",token)
                localStorage.setItem('token', token);
                login(user);
                await reloadUser();

                navigate('/');
            } catch (error) {
                console.error('GitHub OAuth failed', error);
                navigate('/login');
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
            Logging you in via GitHub...
        </div>
    );
};

export default GitHubCallback;
