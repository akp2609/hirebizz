// src/components/admin/JobTable.jsx
import React from "react";

const JobTable = ({ jobs, currentPage, totalPages, onPageChange, onStatusChange,onTitleClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Location</th>
                        <th className="p-2 border">Company</th>
                        <th className="p-2 border">Posted By</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, idx) => (
                        <tr key={job._id} className="text-center">
                            <td className="p-2 border">{(currentPage - 1) * 10 + idx + 1}</td>
                            <td
                                className="p-2 border text-blue-600 hover:underline cursor-pointer"
                                onClick={() => onTitleClick(job)}
                            >
                                {job.title}
                            </td>
                            <td className="p-2 border">{job.location}</td>
                            <td className="p-2 border">{job.company?.name || "N/A"}</td>
                            <td className="p-2 border">
                                {job.company?.createdBy?.name}<br />
                                <span className="text-sm text-gray-600">{job.company?.createdBy?.email}</span>
                            </td>
                            <td className="p-2 border capitalize">{job.status}</td>
                            <td className="p-2 border flex gap-2 justify-center">
                                <button
                                    onClick={() => onStatusChange(job._id, "approved")}
                                    className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => onStatusChange(job._id, "rejected")}
                                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                                >
                                    Reject
                                </button>
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

export default JobTable;
