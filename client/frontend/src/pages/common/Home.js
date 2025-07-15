import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CandidateDashboard from '../candidate/CandidateDashboard';
import EmployerDashboard from '../employer/EmployerDashboard';

function Home() {
    const { user, loadingUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingUser && user) {
            if (user.role === 'admin' || user.role === 'superadmin') {
                navigate('/admin');
            }
        }
    }, [user, loadingUser, navigate]);

    if (loadingUser) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading ...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">Please log in to view your dashboard.</p>
            </div>
        );
    }

    switch (user.role) {
        case 'candidate':
            return <CandidateDashboard />;
        case 'employer':
            return <EmployerDashboard />;
        default:
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-red-500 text-lg">Invalid user role: {user.role}</p>
                </div>
            );
    }
}

export default Home;
