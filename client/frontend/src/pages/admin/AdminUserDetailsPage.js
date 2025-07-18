import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileCard from "../../components/common/UserProfileCard";
import { getUserById } from "../../services/adminService";


const AdminUserDetailsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data.user);
            } catch (err) {
                setError("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p className="text-gray-600">Loading user data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p className="text-gray-500">User not found.</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
                Admin View: User Profile
            </h1>
            <UserProfileCard user={user} />
        </div>
    );
};

export default AdminUserDetailsPage;
