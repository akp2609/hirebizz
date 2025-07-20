import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import UserProfileCard from '../../components/common/UserProfileCard';
import { refreshUserResumeURL } from '../../services/userService';

const UserProfilePage = () => {
    const { user, loadingUser, error } = useUser();

    const [resume,setResume] = useState();

    const fetchRefreshedResume = async()=>{
        try{
            const res = await refreshUserResumeURL();
            setResume(res);
        }catch(err){
            console.log(err);
        }
    }

    useState(()=>{
        fetchRefreshedResume()
    },[])

    if (loadingUser) return <p className="text-gray-600">Loading user data...</p>;
    if (error) return <p className="text-red-500">Failed to load user: {error}</p>;

    if (!user) return <p className="text-gray-500">No user data available.</p>;

    return (
        <div className="p-4 min-h-screen bg-blue-200">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Profile</h1>
            <UserProfileCard user={user} resumeURL={resume} />
        </div>
    );
};

export default UserProfilePage;
