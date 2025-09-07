import { useEffect, useState } from "react";
import {
    Search,
    X,
    Briefcase,
    Filter,
    Calendar,
    TrendingUp,
    FileText,
} from "lucide-react";
import ApplicationCard from "../../components/candidate/ApplicationCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getMyJobApplications } from "../../services/applicationService";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("all");

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 400);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // fetch applications
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const apps = await getMyJobApplications({
                    search: debouncedSearch,
                    sortBy: "appliedAt",
                    order: "desc",
                });
                setApplications(apps);
            } catch (err) {
                setError(err.message || "Failed to fetch applications");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [debouncedSearch]);

    // filter apps
    const filteredApplications = applications.filter(
        (app) => selectedStatus === "all" || app.status === selectedStatus
    );

    const statusCounts = {
        all: applications.length,
        pending: applications.filter((app) => app.status === "pending").length,
        accepted: applications.filter((app) => app.status === "accepted").length,
        rejected: applications.filter((app) => app.status === "rejected").length,
    };

    if (loading) return <LoadingSpinner />;
    if (error)
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-500">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            My Applications
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Track your job applications and monitor your progress
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        {
                            label: "Total",
                            count: statusCounts.all,
                            color: "from-blue-500 to-blue-600",
                            icon: Briefcase,
                        },
                        {
                            label: "Pending",
                            count: statusCounts.pending,
                            color: "from-yellow-500 to-orange-500",
                            icon: Calendar,
                        },
                        {
                            label: "Accepted",
                            count: statusCounts.accepted,
                            color: "from-green-500 to-emerald-500",
                            icon: TrendingUp,
                        },
                        {
                            label: "Rejected",
                            count: statusCounts.rejected,
                            color: "from-red-500 to-red-600",
                            icon: X,
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-white/20"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className={`p-2 bg-gradient-to-r ${stat.color} rounded-xl group-hover:rotate-12 transition-transform duration-300`}
                                >
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-gray-800">
                                    {stat.count}
                                </span>
                            </div>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Search + Filter */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <div
                                className={`absolute inset-y-0 left-0 flex items-center pl-4 ${isSearchFocused ? "text-blue-500" : "text-gray-400"
                                    }`}
                            >
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                placeholder="Search your applications..."
                                className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 ${isSearchFocused
                                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                    : "border-gray-200 hover:border-gray-300"
                                    } focus:outline-none text-gray-700 placeholder-gray-400`}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${filterOpen
                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                    : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filter</span>
                            </button>

                            {filterOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-48 z-50">
                                    {["all", "pending", "accepted", "rejected"].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setFilterOpen(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 capitalize ${selectedStatus === status
                                                ? "bg-blue-50 text-blue-600 font-medium"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {status}{" "}
                                            {status !== "all" && `(${statusCounts[status] || 0})`}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Applications */}
                {filteredApplications.length === 0 ? (
                    <div className="bg-white/80 rounded-2xl shadow-xl p-12 text-center border border-white/20">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            No applications found
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm
                                ? "Try adjusting your search terms"
                                : "You haven’t applied to any jobs yet."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredApplications.map((application, index) => (
                            <div
                                key={application._id}
                                className="transform transition-all duration-500"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: "slideInUp 0.6s ease-out forwards",
                                }}
                            >
                                <ApplicationCard
                                    id={application._id}
                                    application={application}
                                    onWithdraw={(id) => {
                                        setApplications((prev) =>
                                            prev.filter((app) => app._id !== id)
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default MyApplications;
