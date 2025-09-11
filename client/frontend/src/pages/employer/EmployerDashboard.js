import React, { useEffect, useState } from 'react';
import ModalWrapper from '../../components/common/ModalWrapper.js';
import Pagination from '../../components/common/Pagination.js';
import PostJobForm from '../../components/employer/PostJobForm';
import { useUser } from '../../context/UserContext.js';
import { closeJobRequest, deleteJob, fetchEmployerJobs } from '../../services/jobService.js';
import MyJobCard from '../../components/employer/MyJobCard.js';
import { Link } from 'react-router-dom';
import { 
    Search, 
    Plus, 
    Briefcase, 
    TrendingUp, 
    Users, 
    Eye,
    Sparkles,
    Building2,
    ChevronRight,
    Filter
} from 'lucide-react';

// Background animations
const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
    </div>
);

const EmployerDashboard = () => {
    const { user, loadingUser } = useUser();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showPostModal, setShowPostModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!loadingUser && user) {
            loadEmployerJobs();
        }
    }, [user, loadingUser]);

    const loadEmployerJobs = async () => {
        try {
            setLoading(true);
            const res = await fetchEmployerJobs();
            if (res?.success) {
                const sortedJobs = res.jobs.sort((a, b) => b.isActive - a.isActive);
                setJobs(sortedJobs || []);
                setTotalPages(res.totalPages || 1);
            } else {
                setError('Failed to load your posted jobs.');
            }
        } catch (err) {
            console.error("Employer job fetch error:", err);
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => setPage(newPage);

    const handleCloseJob = async (jobId) => {
        try {
            await closeJobRequest(jobId);
            loadEmployerJobs();
        } catch (err) {
            console.error("Error closing job:", err);
            alert("An error occurred while closing the job.");
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            await deleteJob(jobId);
            loadEmployerJobs();
        } catch (err) {
            console.error("Error deleting job:", err);
            alert("An error occurred while deleting the job.");
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeJobs = jobs.filter(job => job.isActive).length;
    const totalApplications = jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50 relative">
            <AnimatedBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Your Job Dashboard
                        </h1>
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your job postings, track applications, and find the perfect candidates
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-white/80 rounded-2xl shadow text-center">
                        <Briefcase className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <p className="text-gray-600">Total Jobs</p>
                        <p className="text-xl font-bold">{jobs.length}</p>
                    </div>
                    <div className="p-6 bg-white/80 rounded-2xl shadow text-center">
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <p className="text-gray-600">Active Jobs</p>
                        <p className="text-xl font-bold">{activeJobs}</p>
                    </div>
                    <div className="p-6 bg-white/80 rounded-2xl shadow text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <p className="text-gray-600">Total Applications</p>
                        <p className="text-xl font-bold">{totalApplications}</p>
                    </div>
                </div>

                {/* Search + Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search jobs by title..."
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white rounded-xl font-semibold transition hover:scale-105 shadow"
                            onClick={() => setShowPostModal(true)}
                        >
                            <Plus className="w-4 h-4" />
                            <span>Post New Job</span>
                        </button>
                    </div>
                </div>

                {/* Jobs list */}
                {loading ? (
                    <p className="text-center">Loading jobs...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : filteredJobs.length === 0 ? (
                    <p className="text-center text-gray-600">No jobs found for your search.</p>
                ) : (
                    <div className="space-y-6">
                        {filteredJobs.map((job) => (
                            <div key={job._id} className="bg-white/60 rounded-2xl shadow p-6">
                                <MyJobCard job={job} onDelete={handleDeleteJob} onClose={handleCloseJob} />
                                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to={`/employer/job/${job._id}/applications`}
                                        state={{ jobTitle: job.title }}
                                        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105 shadow"
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>View Applicants</span>
                                    </Link>
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                                        <p>{job.applications?.length || 0} applications</p>
                                        <p> {job.views?.length || 0} views</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>

            {/* Modal */}
            <ModalWrapper
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                title="Post a New Job"
                maxWidth="max-w-3xl"
            >
                <PostJobForm
                    onSuccess={() => {
                        setShowPostModal(false);
                        loadEmployerJobs();
                    }}
                />
            </ModalWrapper>
        </div>
    );
};

export default EmployerDashboard;
