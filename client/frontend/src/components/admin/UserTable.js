import React, { useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { assignRole,deleteUser } from "../../services/adminService";

const UserTable = ({ users, currentPage, totalPages, onPageChange, refreshUsers }) => {
    const [loadingUserId, setLoadingUserId] = useState(null);

    const handleRoleChange = async (userId, newRole) => {
        try {
            setLoadingUserId(userId);
            await assignRole({ userId, newRole });
            refreshUsers(); 
        } catch (err) {
            console.error('Failed to change role:', err);
        } finally {
            setLoadingUserId(null);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            setLoadingUserId(userId);
            await deleteUser({ userId });
            refreshUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
        } finally {
            setLoadingUserId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Profile</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={user._id} className="text-center">
                            <td className="p-2 border">{(currentPage - 1) * 10 + idx + 1}</td>
                            <td className="p-2 border">
                                <img src={user.profilePicture || "/avatar.png"} alt="Profile" className="w-10 h-10 rounded-full mx-auto" />
                            </td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border capitalize">{user.role}</td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center gap-2">
                                    <select
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer text-sm"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        disabled={loadingUserId === user._id}
                                    >
                                        <option value="candidate">Candidate</option>
                                        <option value="employer">Employer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                                        onClick={() => handleDeleteUser(user._id)}
                                        disabled={loadingUserId === user._id}
                                    >
                                        <TrashIcon className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
