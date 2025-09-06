import React, { useContext, useState } from 'react';
import EditProfileModal from './EditProfileModal';
import VerifyEmailModal from './VerifyEmailModal';
import { verifyEmployer } from '../../services/userService';
import { AuthContext } from '../../context/AuthContext';

const UserProfileCard = ({ user, resumeURL }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [profileUser, setProfileUser] = useState(user);
    const { logout } = useContext(AuthContext);

    const handleProfileUpdate = () => {
        window.location.reload();
    };

    const handleVerify = async () => {
        try {
            await verifyEmployer();
            alert("Verification request sent successfully. Please login again to see the changes.");
            logout();
        } catch (err) {
            console.error("Verification failed:", err);
            alert("Verification failed. Please try again later.");
        }
    };

    if (!user) return null;

    const {
        name,
        email,
        bio,
        location,
        role,
        profilePicture,
        isVerified,
    } = profileUser;

    return (
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-6 sm:px-8 py-10 sm:py-12">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
                    {/* Profile Picture */}
                    <div className="relative group flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-white shadow-xl transform group-hover:scale-105 transition duration-300"
                        />
                        {isVerified && (
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="text-center lg:text-left text-white flex-1">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            {name}
                        </h1>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 mb-4">
                            <p className="text-blue-100 text-base sm:text-lg flex items-center justify-center lg:justify-start gap-2 break-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {email}
                            </p>
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm font-semibold capitalize ${role === 'employer'
                                        ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white'
                                        : 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                                    }`}>
                                    {role}
                                </span>
                                {isVerified && (
                                    <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <button
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full border border-white/30 transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 sm:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Location Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-white group-hover:scale-110 transition duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
                                <p className="text-gray-600 text-base">{location || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bio Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl text-white group-hover:scale-110 transition duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">About</h3>
                                <p className="text-gray-600 text-base leading-relaxed">{bio || "No bio available"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Resume Card - Only for candidates */}
                    {role === 'candidate' && (
                        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl text-white group-hover:scale-110 transition duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Resume</h3>
                                    {resumeURL ? (
                                        <a
                                            href={resumeURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Resume
                                        </a>
                                    ) : (
                                        <p className="text-red-500 font-medium">Not uploaded</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Verification Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl text-white group-hover:scale-110 transition duration-300 ${isVerified
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                                    : 'bg-gradient-to-br from-yellow-500 to-orange-600'
                                }`}>
                                {isVerified ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Verification Status</h3>
                                {isVerified ? (
                                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-full">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Verified Account
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => setShowVerifyModal(true)}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Verify as Employer
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditProfileModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                user={profileUser}
                onProfileUpdated={handleProfileUpdate}
            />

            <VerifyEmailModal
                isOpen={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                email={email}
                onSubmit={handleVerify}
            />
        </div>
    );
};

export default UserProfileCard;
