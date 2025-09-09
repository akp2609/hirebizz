import { useEffect, useState, useCallback } from "react";
import { getAllReports, updateReportStatus } from "../../services/reportService.js";
import ReportTable from "../../components/admin/ReportTable.js";
import {
    AlertTriangle,
    Archive,
    Search,
    RefreshCw,
    Download,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff
} from "lucide-react";

const ReportsPage = () => {
    const [activeReports, setActiveReports] = useState([]);
    const [dismissedReports, setDismissedReports] = useState([]);

    // Pagination
    const [activePage, setActivePage] = useState(1);
    const [dismissedPage, setDismissedPage] = useState(1);
    const [activeTotalPages, setActiveTotalPages] = useState(1);
    const [dismissedTotalPages, setDismissedTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [showDismissed, setShowDismissed] = useState(true);

    // Search
    const [searchTerm, setSearchTerm] = useState("");

    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                activePage,
                dismissedPage,
                limit: pageSize,
                search: searchTerm.trim()
            };

            const data = await getAllReports(params);
            const allReports = data.reports || [];

            const active = allReports.filter(r => r.status !== "dismissed");
            const dismissed = allReports.filter(r => r.status === "dismissed");

            setActiveReports(active);
            setDismissedReports(dismissed);
            setActiveTotalPages(data.activeTotalPages || Math.ceil(active.length / pageSize));
            setDismissedTotalPages(data.dismissedTotalPages || Math.ceil(dismissed.length / pageSize));
        } catch (err) {
            setError(err.message || "Failed to load reports");
        } finally {
            setLoading(false);
        }
    }, [activePage, dismissedPage, pageSize, searchTerm]);

    const handleStatusChange = async (reportId, status) => {
        try {
            setLoading(true);
            await updateReportStatus({ reportId, status });
            await fetchReports();
            setSuccessMessage(`Report status updated to ${status}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError(err.message || "Failed to update report status");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = useCallback(() => {
        fetchReports();
        setSuccessMessage("Reports refreshed successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
    }, [fetchReports]);

    const handleExport = async () => {
        try {
            setLoading(true);
            const allReports = [...activeReports, ...dismissedReports];
            const exportData = allReports.map(report => ({
                id: report._id,
                status: report.status,
                description: report.description,
                reporter: report.reporter,
                createdAt: report.createdAt
            }));

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `reports-export-${new Date().toISOString().split("T")[0]}.json`;
            link.click();

            setSuccessMessage("Reports exported successfully");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Failed to export reports");
        } finally {
            setLoading(false);
        }
    };

    const onAction = async (action, reportId) => {
        switch (action) {
            case "resolve":
                await handleStatusChange(reportId, "resolved");
                break;
            case "dismiss":
                await handleStatusChange(reportId, "dismissed");
                break;
            default:
                console.log("Unknown action:", action);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <AlertTriangle className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Manage Reports</h1>
                                <p className="text-gray-600">
                                    {loading ? "Loading..." : `${activeReports.length + dismissedReports.length} total reports`}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                                Refresh
                            </button>

                            <button
                                onClick={handleExport}
                                disabled={loading || (activeReports.length + dismissedReports.length === 0)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </button>

                            <button
                                onClick={() => setShowDismissed(!showDismissed)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                {showDismissed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                {showDismissed ? "Hide" : "Show"} Dismissed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <p className="text-green-800">{successMessage}</p>
                    </div>
                )}

                {/* Search */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search reports by description or reporter..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setActivePage(1);
                                    setDismissedPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-lg shadow-sm p-12">
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <RefreshCw className="h-8 w-8 animate-spin text-orange-600" />
                                <p className="text-gray-600">Loading reports...</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Active Reports */}
                        <div className="bg-white rounded-lg shadow-sm mb-6">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Active Reports ({activeReports.length})
                                    </h2>
                                </div>
                            </div>

                            {activeReports.length === 0 ? (
                                <div className="p-12 text-center">
                                    <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active reports</h3>
                                    <p className="text-gray-600">All reports have been handled. Great job!</p>
                                </div>
                            ) : (
                                <ReportTable
                                    reports={activeReports}
                                    onAction={onAction}
                                    currentPage={activePage}
                                    totalPages={activeTotalPages}
                                    onPageChange={setActivePage}
                                    onStatusChange={handleStatusChange}
                                    refreshReports={fetchReports}
                                    loading={loading}
                                />
                            )}
                        </div>

                        {/* Dismissed Reports */}
                        {showDismissed && (
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <Archive className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Dismissed Reports ({dismissedReports.length})
                                        </h2>
                                    </div>
                                </div>

                                {dismissedReports.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Archive className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No dismissed reports</h3>
                                        <p className="text-gray-600">Dismissed reports will appear here.</p>
                                    </div>
                                ) : (
                                    <ReportTable
                                        reports={dismissedReports}
                                        onAction={onAction}
                                        currentPage={dismissedPage}
                                        totalPages={dismissedTotalPages}
                                        onPageChange={setDismissedPage}
                                        onStatusChange={() => { }}
                                        loading={loading}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReportsPage;
