import React, { useState } from "react";
import UserDetailsModal from "../common/UserDetailsModal";
import JobDetailsModal from "../candidate/JobDetailsModal";
import { updateReportStatus } from "../../services/reportService";


const ReportTable = ({ reports, currentPage, totalPages, onPageChange, refreshReports }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loadingReportId, setLoadingReportId] = useState(null);

    const handleAction = async (reportId, actionType) => {
        const status = actionType === "dismiss" ? "dismissed" : "reviewed";
        if (!window.confirm(`Are you sure you want to ${actionType} this report?`)) return;

        try {
            setLoadingReportId(reportId);
            await updateReportStatus(reportId, { status });
            refreshReports();
        } catch (err) {
            console.error("Failed to update report status:", err);
            alert("Failed to update report status.");
        } finally {
            setLoadingReportId(null);
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Reporter</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Reported</th>
                            <th className="p-2 border">Reason</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, idx) => (
                            <tr key={report._id} className="text-center">
                                <td className="p-2 border">{idx + 1}</td>
                                <td className="p-2 border">
                                    <div>{report.reporter?.name}</div>
                                    <div className="text-xs text-gray-600">{report.reporter?.email}</div>
                                </td>
                                <td className="p-2 border capitalize">{report.targetType}</td>
                                <td className="p-2 border">
                                    {report.targetType === "user" && report.reportedUser ? (
                                        <a
                                            href={`/admin/users/${report.reportedUser._id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline text-sm"
                                        >
                                            {report.reportedUser.name}
                                        </a>
                                    ) : report.targetType === "job" && report.reportedJob ? (
                                        <button
                                            onClick={() => setSelectedJob(report.reportedJob)}
                                            className="text-blue-600 underline text-sm"
                                        >
                                            {report.reportedJob.title}
                                        </button>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="p-2 border">{report.reason}</td>
                                <td className="p-2 border capitalize">{report.status}</td>
                                <td className="p-2 border">{new Date(report.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 border flex justify-center gap-2">
                                    <button
                                        disabled={loadingReportId === report._id}
                                        onClick={() => handleAction(report._id, "dismiss")}
                                        className="px-2 py-1 bg-gray-400 text-white rounded text-sm disabled:opacity-50"
                                    >
                                        {loadingReportId === report._id ? "..." : "Dismiss"}
                                    </button>
                                    <button
                                        disabled={loadingReportId === report._id}
                                        onClick={() => handleAction(report._id, "delete")}
                                        className="px-2 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
                                    >
                                        {loadingReportId === report._id ? "..." : "Delete"}
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

            <JobDetailsModal
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
                job={selectedJob}
                isAdminView={true}
            />

            {selectedUser && (
                <UserDetailsModal
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                    user={selectedUser}
                />
            )}
        </>
    );
};

export default ReportTable;