import { useEffect, useState, useMemo } from "react";
import {
    Briefcase,
    Search,
    Filter,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Users,
    Clock,
    Eye,
    Building2,
    Calendar,
    MapPin,
    Zap,
    ChevronLeft,
    ChevronRight,
    Loader2,
    TrendingUp,
} from "lucide-react";
import { getAllJobs, updateJobStatus } from "../../services/adminService";
import JobDetailsModal from "../../components/candidate/JobDetailsModal";

// ---- Stats Card ----
const StatsCard = ({ icon: Icon, title, value, color, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
        >
            <div className="relative group">
                <div
                    className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}
                />
                <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">{title}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                        </div>
                        <div className={`p-4 bg-gradient-to-br ${color} rounded-xl shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---- Job Card ----
const JobCard = ({ job, index, onStatusChange, onTitleClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return {
                    color: "from-green-400 to-emerald-500",
                    bg: "bg-green-50",
                    text: "text-green-700",
                    icon: CheckCircle,
                    label: "Active",
                };
            case "paused":
                return {
                    color: "from-yellow-400 to-orange-500",
                    bg: "bg-yellow-50",
                    text: "text-yellow-700",
                    icon: Clock,
                    label: "Paused",
                };
            case "closed":
                return {
                    color: "from-red-400 to-pink-500",
                    bg: "bg-red-50",
                    text: "text-red-700",
                    icon: AlertCircle,
                    label: "Closed",
                };
            default:
                return {
                    color: "from-gray-400 to-gray-500",
                    bg: "bg-gray-50",
                    text: "text-gray-700",
                    icon: Clock,
                    label: "Unknown",
                };
        }
    };

    const statusConfig = getStatusConfig(job.status);
    const StatusIcon = statusConfig.icon;

    const handleStatusChange = async (newStatus) => {
        setStatusLoading(true);
        try {
            await onStatusChange(job._id, newStatus);
        } finally {
            setStatusLoading(false);
        }
    };

    return (
        <div
            className={`transform transition-all duration-500 ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                } ${isHovered ? "scale-[1.02] -rotate-1" : "scale-100 rotate-0"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div
                    className={`absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 rounded-2xl opacity-0 blur transition-opacity duration-500 ${isHovered ? "opacity-20" : "opacity-0"
                        }`}
                />

                <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-purple-200">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                    <Zap className="w-2.5 h-2.5 text-white" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <button
                                    onClick={() => onTitleClick(job)}
                                    className="text-lg font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300 text-left"
                                >
                                    {job.title}
                                </button>

                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Building2 className="w-4 h-4 text-purple-500" />
                                        <span>{job.company?.name || "Unknown Company"}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        <span>
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 mt-3">
                                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span>{job.applications || 0} applications</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                                        <Eye className="w-4 h-4 text-blue-500" />
                                        <span>{job.views || 0} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div
                                className={`inline-flex items-center px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} text-sm font-semibold`}
                            >
                                <StatusIcon className="w-3 h-3 mr-1.5" />
                                {statusConfig.label}
                                <div
                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${statusConfig.color} ml-2 animate-pulse`}
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={job.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={statusLoading}
                                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors duration-300"
                                >
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="closed">Closed</option>
                                </select>
                                {statusLoading && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---- Pagination ----
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === page
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

// ---- ManageJobs ----
const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getAllJobs(page, 10);
            setJobs(data.jobs || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (jobId, status) => {
        try {
            await updateJobStatus({ jobId, status });
            await fetchJobs();
        } catch (err) {
            alert("Failed to update job status");
        }
    };

    const openModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedJob(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    // ---- frontend filters ----
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company?.name?.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                filterStatus === "all" || job.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [jobs, search, filterStatus]);

    // ---- stats (API-driven, no fake ones) ----
    const stats = [
        {
            icon: Briefcase,
            title: "Total Jobs",
            value: jobs.length,
            color: "from-blue-400 to-blue-600",
            delay: 0,
        },
        {
            icon: CheckCircle,
            title: "Active Jobs",
            value: jobs.filter((j) => j.status === "active").length,
            color: "from-green-400 to-green-600",
            delay: 100,
        },
        {
            icon: Clock,
            title: "Paused Jobs",
            value: jobs.filter((j) => j.status === "paused").length,
            color: "from-yellow-400 to-orange-500",
            delay: 200,
        },
        {
            icon: AlertCircle,
            title: "Closed Jobs",
            value: jobs.filter((j) => j.status === "closed").length,
            color: "from-red-400 to-pink-500",
            delay: 300,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
                                    Job Management Dashboard
                                </h1>
                                <p className="text-xl text-gray-600">
                                    Monitor and manage all job postings
                                </p>
                            </div>

                            <button
                                onClick={fetchJobs}
                                disabled={loading}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
                            >
                                <RefreshCw
                                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                                />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                                <p className="text-xl font-semibold text-gray-600 mt-6">
                                    Loading jobs...
                                </p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <p className="text-xl font-semibold text-red-600 mb-2">
                                    Something went wrong
                                </p>
                                <p className="text-red-500 mb-6">{error}</p>
                                <button
                                    onClick={fetchJobs}
                                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        All Job Postings
                                    </h2>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search jobs..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-colors duration-300"
                                            />
                                        </div>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}

                                            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-colors duration-300"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="paused">Paused</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                {filteredJobs.length > 0 ? (
                                    <div className="grid gap-6">
                                        {filteredJobs.map((job, index) => (
                                            <JobCard
                                                key={job._id}
                                                job={job}
                                                index={index}
                                                onStatusChange={handleStatusChange}
                                                onTitleClick={openModal}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                            <Briefcase className="w-8 h-8 text-purple-500" />
                                        </div>
                                        <p className="text-xl font-semibold text-gray-600 mb-2">
                                            No jobs found
                                        </p>
                                        <p className="text-gray-500">Try adjusting your filters</p>
                                    </div>
                                )}

                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Job Details Modal */}
            {isModalOpen && selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={closeModal} />
            )}
        </div>
    );
};

export default ManageJobs;
