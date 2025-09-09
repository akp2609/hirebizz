import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "../../services/adminService";
import UserTable from "../../components/admin/UserTable";
import {
    Search,
    Filter,
    Users,
    RefreshCw,
    AlertCircle,
} from "lucide-react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Search + filter
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    const pageSize = 10;

    const fetchUsers = useCallback(
        async (pageNum = 1, search = searchTerm, role = roleFilter) => {
            try {
                setLoading(true);
                setError("");

                // Build params only for what backend actually supports
                const params = {
                    page: pageNum,
                    limit: pageSize,
                    search: search.trim(),
                    role: role !== "all" ? role : undefined,
                };

                const data = await getAllUsers(pageNum, pageSize, params);
                setUsers(data.users || []);
                setTotalPages(data.totalPage || 1);
                setTotalUsers(data.totalUsers || data.users?.length || 0);
            } catch (err) {
                setError(err.message || "Failed to load users");
                setUsers([]);
            } finally {
                setLoading(false);
            }
        },
        [searchTerm, roleFilter]
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handleFilterChange = (value) => {
        setRoleFilter(value);
        setPage(1);
    };

    const handleRefresh = () => {
        fetchUsers(page);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setRoleFilter("all");
        setPage(1);
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page, searchTerm, roleFilter]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Manage Users
                                </h1>
                                <p className="text-gray-600">
                                    {loading
                                        ? "Loading..."
                                        : totalUsers
                                            ? `${totalUsers} total users`
                                            : ""}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                            />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-800">{error}</p>
                        <button
                            onClick={() => setError("")}
                            className="ml-auto text-red-600 hover:text-red-800"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Search + Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="candidate">Candidate</option>
                                    <option value="employer">Employer</option>
                                </select>
                            </div>

                            {(searchTerm || roleFilter !== "all") && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <div className="flex flex-col items-center gap-3">
                                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                                <p className="text-gray-600">Loading users...</p>
                            </div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12">
                            <Users className="h-16 w-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No users found
                            </h3>
                            <p className="text-gray-600 text-center max-w-md">
                                {searchTerm || roleFilter !== "all"
                                    ? "No users match your current filters."
                                    : "There are no users in the system yet."}
                            </p>
                            {(searchTerm || roleFilter !== "all") && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <UserTable
                            users={users}
                            onPageChange={setPage}
                            currentPage={page}
                            totalPages={totalPages}
                            refreshUsers={fetchUsers}
                        />
                    )}
                </div>

                {/* Pagination Info */}
                {users.length > 0 && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Showing {(page - 1) * pageSize + 1} to{" "}
                        {Math.min(page * pageSize, totalUsers)} of {totalUsers} users
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
