import { useEffect, useState, useCallback } from "react";
import { getAllReports, updateReportStatus } from "../../services/reportService.js";
import ReportTable from "../../components/admin/ReportTable.js";
import {
    AlertTriangle,
    Archive,
    Search,
    Filter,
    RefreshCw,
    Download,
    BarChart3,
    CheckCircle,
    AlertCircle,
    Clock,
    Eye,
    EyeOff,
    Calendar,
    User,
    Tag
} from "lucide-react";

const ReportsPage = () => {
    const [activeReports, setActiveReports] = useState([]);
    const [dismissedReports, setDismissedReports] = useState([]);
    const [filteredActiveReports, setFilteredActiveReports] = useState([]);
    const [filteredDismissedReports, setFilteredDismissedReports] = useState([]);

    // Pagination states
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

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [showFilters, setShowFilters] = useState(false);

    // Selection states
    const [selectedActiveReports, setSelectedActiveReports] = useState([]);
    const [selectedDismissedReports, setSelectedDismissedReports] = useState([]);
    const [bulkAction, setBulkAction] = useState("");

    // Stats
    const [reportStats, setReportStats] = useState({
        total: 0,
        active: 0,
        dismissed: 0,
        highPriority: 0,
        resolved: 0
    });

    const fetchReports = useCallback(async (activePageNum = activePage, dismissedPageNum = dismissedPage) => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                activePage: activePageNum,
                dismissedPage: dismissedPageNum,
                limit: pageSize,
                search: searchTerm.trim(),
                type: typeFilter !== "all" ? typeFilter : undefined,
                priority: priorityFilter !== "all" ? priorityFilter : undefined,
                dateFilter: dateFilter !== "all" ? dateFilter : undefined,
                sortBy,
                sortOrder
            };

            const data = await getAllReports(params);
            const allReports = data.reports || [];

            const active = allReports.filter(r => r.status !== 'dismissed');
            const dismissed = allReports.filter(r => r.status === 'dismissed');

            setActiveReports(active);
            setDismissedReports(dismissed);
            setFilteredActiveReports(active);
            setFilteredDismissedReports(dismissed);

            setActiveTotalPages(data.activeTotalPages || Math.ceil(active.length / pageSize));
            setDismissedTotalPages(data.dismissedTotalPages || Math.ceil(dismissed.length / pageSize));

            // Calculate stats
            setReportStats({
                total: allReports.length,
                active: active.length,
                dismissed: dismissed.length,
                highPriority: allReports.filter(r => r.priority === 'high').length,
                resolved: allReports.filter(r => r.status === 'resolved').length
            });

        } catch (err) {
            setError(err.message || "Failed to load reports");
        } finally {
            setLoading(false);
        }
    }, [activePage, dismissedPage, pageSize, searchTerm, typeFilter, priorityFilter, dateFilter, sortBy, sortOrder]);

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

    const handleBulkAction = async () => {
        if (!bulkAction) return;

        const selectedReports = [...selectedActiveReports, ...selectedDismissedReports];
        if (selectedReports.length === 0) return;

        try {
            setLoading(true);

            // Process bulk actions
            for (const reportId of selectedReports) {
                await updateReportStatus({ reportId, status: bulkAction });
            }

            await fetchReports();
            setSuccessMessage(`Bulk action "${bulkAction}" applied to ${selectedReports.length} reports`);
            setSelectedActiveReports([]);
            setSelectedDismissedReports([]);
            setBulkAction("");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError(err.message || "Failed to perform bulk action");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        setActivePage(1);
        setDismissedPage(1);
    }, []);

    const handleFilterChange = useCallback((filterType, value) => {
        switch (filterType) {
            case 'type':
                setTypeFilter(value);
                break;
            case 'priority':
                setPriorityFilter(value);
                break;
            case 'date':
                setDateFilter(value);
                break;
            case 'sort':
                setSortBy(value);
                break;
            case 'order':
                setSortOrder(value);
                break;
            case 'pageSize':
                setPageSize(value);
                break;
        }
        setActivePage(1);
        setDismissedPage(1);
    }, []);

    const clearFilters = () => {
        setSearchTerm("");
        setTypeFilter("all");
        setPriorityFilter("all");
        setDateFilter("all");
        setSortBy("createdAt");
        setSortOrder("desc");
        setActivePage(1);
        setDismissedPage(1);
    };

    const handleRefresh = useCallback(() => {
        fetchReports();
        setSelectedActiveReports([]);
        setSelectedDismissedReports([]);
        setSuccessMessage("Reports refreshed successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
    }, [fetchReports]);

    const handleExport = async () => {
        try {
            setLoading(true);
            const allReports = [...activeReports, ...dismissedReports];
            const exportData = allReports.map(report => ({
                id: report.id,
                type: report.type,
                priority: report.priority,
                status: report.status,
                description: report.description,
                reporter: report.reporter,
                createdAt: report.createdAt,
                updatedAt: report.updatedAt
            }));

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `reports-export-${new Date().toISOString().split('T')[0]}.json`;
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
            case 'view':
                // Implement view logic
                break;
            case 'resolve':
                await handleStatusChange(reportId, 'resolved');
                break;
            case 'dismiss':
                await handleStatusChange(reportId, 'dismissed');
                break;
            case 'escalate':
                await handleStatusChange(reportId, 'escalated');
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
        <div className={`${bgColor} rounded-lg p-4 border-l-4 ${color}`}>
            <div className="flex items-center">
                <Icon className={`h-8 w-8 ${color.replace('border-', 'text-')}`} />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

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
                                    {loading ? "Loading..." : `${reportStats.total} total reports`}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>

                            <button
                                onClick={handleExport}
                                disabled={loading || reportStats.total === 0}
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
                                {showDismissed ? 'Hide' : 'Show'} Dismissed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <StatCard
                        icon={BarChart3}
                        title="Total Reports"
                        value={reportStats.total}
                        color="border-blue-500"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        icon={AlertTriangle}
                        title="Active Reports"
                        value={reportStats.active}
                        color="border-orange-500"
                        bgColor="bg-orange-50"
                    />
                    <StatCard
                        icon={Archive}
                        title="Dismissed"
                        value={reportStats.dismissed}
                        color="border-gray-500"
                        bgColor="bg-gray-50"
                    />
                    <StatCard
                        icon={AlertCircle}
                        title="High Priority"
                        value={reportStats.highPriority}
                        color="border-red-500"
                        bgColor="bg-red-50"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Resolved"
                        value={reportStats.resolved}
                        color="border-green-500"
                        bgColor="bg-green-50"
                    />
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-800">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-red-600 hover:text-red-800"
                        >
                            ×
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <p className="text-green-800">{successMessage}</p>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search reports by description, reporter, or ID..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Tag className="inline h-4 w-4 mr-1" />
                                        Type
                                    </label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="spam">Spam</option>
                                        <option value="harassment">Harassment</option>
                                        <option value="inappropriate">Inappropriate Content</option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                                        Priority
                                    </label>
                                    <select
                                        value={priorityFilter}
                                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="all">All Priorities</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Calendar className="inline h-4 w-4 mr-1" />
                                        Date Range
                                    </label>
                                    <select
                                        value={dateFilter}
                                        onChange={(e) => handleFilterChange('date', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="all">All Time</option>
                                        <option value="today">Today</option>
                                        <option value="yesterday">Yesterday</option>
                                        <option value="week">This Week</option>
                                        <option value="month">This Month</option>
                                        <option value="quarter">This Quarter</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Clock className="inline h-4 w-4 mr-1" />
                                        Sort By
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="createdAt">Date Created</option>
                                            <option value="priority">Priority</option>
                                            <option value="type">Type</option>
                                            <option value="status">Status</option>
                                        </select>
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => handleFilterChange('order', e.target.value)}
                                            className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="desc">↓</option>
                                            <option value="asc">↑</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-orange-600 hover:text-orange-800"
                                >
                                    Clear all filters
                                </button>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-700">Show:</label>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => handleFilterChange('pageSize', parseInt(e.target.value))}
                                        className="p-1 border border-gray-300 rounded text-sm"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-gray-700">per page</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bulk Actions */}
                {(selectedActiveReports.length > 0 || selectedDismissedReports.length > 0) && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <p className="text-orange-800">
                                {selectedActiveReports.length + selectedDismissedReports.length} report{selectedActiveReports.length + selectedDismissedReports.length !== 1 ? 's' : ''} selected
                            </p>
                            <div className="flex items-center gap-3">
                                <select
                                    value={bulkAction}
                                    onChange={(e) => setBulkAction(e.target.value)}
                                    className="p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">Choose action...</option>
                                    <option value="resolved">Mark as Resolved</option>
                                    <option value="dismissed">Dismiss</option>
                                    <option value="escalated">Escalate</option>
                                    <option value="pending">Mark as Pending</option>
                                </select>
                                <button
                                    onClick={handleBulkAction}
                                    disabled={!bulkAction || loading}
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                        Active Reports ({reportStats.active})
                                    </h2>
                                </div>
                            </div>

                            {filteredActiveReports.length === 0 ? (
                                <div className="p-12 text-center">
                                    <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active reports</h3>
                                    <p className="text-gray-600">
                                        {searchTerm || typeFilter !== "all" || priorityFilter !== "all"
                                            ? "No reports match your current filters."
                                            : "All reports have been handled. Great job!"
                                        }
                                    </p>
                                </div>
                            ) : (
                                <ReportTable
                                    reports={filteredActiveReports}
                                    onAction={onAction}
                                    currentPage={activePage}
                                    totalPages={activeTotalPages}
                                    onPageChange={setActivePage}
                                    onStatusChange={handleStatusChange}
                                    refreshReports={fetchReports}
                                    selectedReports={selectedActiveReports}
                                    onSelectionChange={setSelectedActiveReports}
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
                                            Dismissed Reports ({reportStats.dismissed})
                                        </h2>
                                    </div>
                                </div>

                                {filteredDismissedReports.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Archive className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No dismissed reports</h3>
                                        <p className="text-gray-600">Dismissed reports will appear here.</p>
                                    </div>
                                ) : (
                                    <ReportTable
                                        reports={filteredDismissedReports}
                                        onAction={onAction}
                                        currentPage={dismissedPage}
                                        totalPages={dismissedTotalPages}
                                        onPageChange={setDismissedPage}
                                        onStatusChange={() => { }}
                                        selectedReports={selectedDismissedReports}
                                        onSelectionChange={setSelectedDismissedReports}
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