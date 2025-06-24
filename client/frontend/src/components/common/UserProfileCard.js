import React from 'react';

const UserProfileCard = ({ user }) => {
    if (!user) return null;

    const {
        name,
        email,
        bio,
        location,
        role,
        profilePicture,
        company,
        resumeURL,
        isVerified,
        authProvider
    } = user;

    return (

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                />

                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                    <p className="text-sm text-gray-600">{email}</p>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{role}</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Location</h3>
                    <p className="text-gray-700">{location || "Not specified"}</p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Bio</h3>
                    <p className="text-gray-700">{bio || "No bio available"}</p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Resume</h3>
                    {resumeURL ? (
                        <a
                            href={resumeURL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>
                    ) : (
                        <p className="text-red-500">Not uploaded</p>
                    )}
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Verification</h3>
                    <p className={isVerified ? "text-green-600" : "text-yellow-600"}>
                        {isVerified ? "Verified" : "Not Verified"}
                    </p>
                </div>
            </div>

            {/* Footer (Optional) */}
            <div className="mt-6 flex justify-end">
                <button className="btn btn-outline btn-sm">Edit Profile</button>
            </div>
        </div>
    );
};

export default UserProfileCard;
