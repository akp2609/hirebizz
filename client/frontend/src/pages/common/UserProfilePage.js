import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import UserProfileCard from '../../components/common/UserProfileCard';
import { refreshUserResumeURL } from '../../services/userService';

const UserProfilePage = () => {
    const { user, loadingUser, error } = useUser();
    const [resume, setResume] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchRefreshedResume = async () => {
        try {
            setIsLoading(true);
            const res = await refreshUserResumeURL();
            setResume(res);
        } catch (err) {
            console.error("Failed to fetch resume:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRefreshedResume();
    }, []);

    // Loading screen
    if (loadingUser || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    // Error screen
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // No user
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">No Profile Found</h2>
                    <p className="text-gray-600 mb-4">
                        We couldn't find your user data.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    // Success - profile screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Your Profile
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage your profile information and showcase your professional presence
                </p>
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto">
                <UserProfileCard user={user} resumeURL={resume} />
            </div>
        </div>
    );
};

export default UserProfilePage;
