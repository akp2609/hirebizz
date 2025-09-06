import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../../components/common/JobCard';
import JobFilters from '../../components/common/JobFilters';
import Pagination from '../../components/common/Pagination';
import { fetchJobs, updateJobStats } from '../../services/jobService';
import { getUserRelevantJobs, getUserSavedJobs } from '../../services/userService';
import { useUser } from '../../context/UserContext';
import JobDetailsModal from '../../components/candidate/JobDetailsModal';

const defaultFilters = {
    location: '',
    skills: [],
    isActive: 'true',
    minComp: '',
    sortBy: '',
    search: '',
    page: 1,
};

const JobsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(defaultFilters);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [hasResume, setHasResume] = useState(false);
    const [relevantJobs, setRelevantJobs] = useState([]);
    const [showAllRelevant, setShowAllRelevant] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const { user } = useUser();

    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const fetchSavedJobIds = async () => {
            try {
                const savedJobs = await getUserSavedJobs();
                const ids = savedJobs.map(job => job._id.toString());
                setSavedJobIds(ids);
            } catch (err) {
                console.error("Failed to fetch saved jobs", err);
            }
        };

        fetchSavedJobIds();
    }, []);

    useEffect(() => {
        const query = Object.fromEntries([...searchParams]);
        const parsed = {
            ...defaultFilters,
            ...query,
            skills: query.skills ? query.skills.split(',') : [],
            page: parseInt(query.page) || 1,
        };
        setFilters(parsed);
        loadJobs(parsed);
    }, []);

    useEffect(() => {
        if (user.objectName && user.isPremiumUser) {
            setHasResume(true);

            getUserRelevantJobs()
                .then(res => {
                    if (res?.success && Array.isArray(res.relevantJobs)) {
                        setRelevantJobs(res.relevantJobs);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch relevant jobs:", err);
                });
        }
    }, [user?.objectName, user?.isPremiumUser]);

    const loadJobs = async (appliedFilters) => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchJobs({
                ...appliedFilters,
                skills: appliedFilters.skills.join(','),
                page: appliedFilters.page,
            });
            setJobs(data.jobs || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        setSearchParams({
            ...newFilters,
            skills: newFilters.skills.join(','),
        });
        loadJobs(newFilters);
    };

    const handlePageChange = (newPage) => {
        const updated = { ...filters, page: newPage };
        updateFilters(updated);
    };

    const jobStatsUpdate = async (jobId) => {
        if (jobId && user) {
            const res = await updateJobStats(jobId, "view");
            console.log("Job stats updated:", res);
        }
    }

    const openJobDetails = (job) => {
        jobStatsUpdate(job._id);
        setSelectedJob(job);
        setShowDetailsModal(true);
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
        setShowDetailsModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">
                                {jobs.length} Live Opportunities Available
                            </span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
                            Discover Your Next
                            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                                Career Adventure
                            </span>
                        </h1>
                        
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Explore thousands of opportunities from top companies worldwide. Your dream job is just one click away.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <JobFilters filters={filters} onChange={updateFilters} />

                {/* Loading and Error States */}
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                            <div className="mt-4 text-center text-blue-600 font-medium">Finding perfect matches...</div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-lg mb-8">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Recommended Jobs Section */}
                {hasResume && relevantJobs.length > 0 && !loading && (
                    <div className="mb-16">
                        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl shadow-2xl border border-orange-200/50 p-8">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-red-400/5"></div>
                            
                            <div className="relative">
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="font-bold text-lg">AI-Powered Recommendations</span>
                                    </div>
                                    <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                                        Jobs Tailored Just For You
                                    </h2>
                                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                                        Based on your resume and preferences, we've curated these perfect matches
                                    </p>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {(showAllRelevant ? relevantJobs : relevantJobs.slice(0, 6))
                                        .filter(job => !user?.appliedJobs?.includes(job._id.toString()))
                                        .map(job => (
                                            <JobCard
                                                key={job._id}
                                                job={job}
                                                isSaved={savedJobIds.includes(job._id.toString())}
                                                onClick={() => openJobDetails(job)}
                                            />
                                        ))}
                                </div>

                                {relevantJobs.length > 6 && (
                                    <div className="flex justify-center mt-10">
                                        <button
                                            onClick={() => setShowAllRelevant(prev => !prev)}
                                            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="relative z-10 flex items-center space-x-3">
                                                <span className="text-lg">
                                                    {showAllRelevant ? 'Show Less Recommendations' : 'View All Recommendations'}
                                                </span>
                                                <svg className={`w-5 h-5 transition-transform duration-300 ${showAllRelevant ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* All Jobs Section */}
                {!loading && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-50 rounded-3xl shadow-2xl border border-gray-200/50 p-8 mb-8">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5"></div>
                        
                        <div className="relative">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                                    </svg>
                                    <span className="font-bold text-lg">Global Opportunities</span>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                    All Available Positions
                                </h2>
                                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                    Browse through our complete collection of job opportunities from companies worldwide
                                </p>
                            </div>

                            {jobs.length === 0 && !loading ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                                    <p className="text-gray-600">Try adjusting your filters to see more opportunities</p>
                                </div>
                            ) : (
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {jobs.map(job => (
                                        <JobCard
                                            key={job._id}
                                            job={job}
                                            onClick={() => openJobDetails(job)}
                                            isSaved={savedJobIds.includes(job._id.toString())}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Pagination page={filters.page} totalPages={totalPages} onPageChange={handlePageChange} />

                {selectedJob && (
                    <JobDetailsModal job={selectedJob} isOpen={showDetailsModal} onClose={closeJobDetails} />
                )}
            </div>
        </div>
    );
};

export default JobsPage;