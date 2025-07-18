import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';

const UserTable = ({ users, currentPage, totalPages, onPageChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                    <tr className="bg-gray-100">
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
                            <td className="p-2 border">{user.role}</td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center gap-2">
                                    <button className="flex items-center bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
                                        Change Role
                                    </button>
                                    <button className="flex items-center justify-center bg-red-600 hover:bg-red-600 px-3 py-2 rounded">
                                        <TrashIcon className="w-5 h-5 text-white cursor-pointer" />
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