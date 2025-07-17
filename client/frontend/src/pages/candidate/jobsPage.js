import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../../components/common/JobCard';
import JobFilters from '../../components/common/JobFilters';
import Pagination from '../../components/common/Pagination';
import { fetchJobs } from '../../services/jobService';
import { getUserRelevantJobs, getUserSavedJobs } from '../../services/userService';
import { useUser } from '../../context/UserContext';
import JobDetailsModal from '../../components/candidate/JobDetailsModal';

const defaultFilters = {
    location: '',
    skills: [],
    isActive: '',
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
        if (user && user.resumeURL) {
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
    }, [user]);

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

    const openJobDetails = (job) => {
        setSelectedJob(job);
        setShowDetailsModal(true);
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
        setShowDetailsModal(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-3">Explore All Jobs</h2>
            <JobFilters filters={filters} onChange={updateFilters} />

            {loading && <p>Loading jobs...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {hasResume && relevantJobs.length > 0 && (
                <>
                    <h2 className="text-xl font-bold mb-3">Recommended Jobs Based on Your Resume</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-4">
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
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowAllRelevant(prev => !prev)}
                                className="text-lg font-bold hover:underline bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg"
                            >
                                {showAllRelevant ? 'Show Less' : 'Show All Relevant Jobs =>'}
                            </button>
                        </div>
                    )}
                </>
            )}

            <h2 className="text-xl font-bold mb-3">All Jobs Posted</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs
                    .filter(job => !user?.appliedJobs?.includes(job._id.toString()))
                    .map(job => (
                        <JobCard
                            key={job._id}
                            job={job}
                            onClick={() => openJobDetails(job)}
                            isSaved={savedJobIds.includes(job._id.toString())}
                        />
                    ))}
            </div>

            <Pagination page={filters.page} totalPages={totalPages} onPageChange={handlePageChange} />

            <JobDetailsModal job={selectedJob} isOpen={showDetailsModal} onClose={closeJobDetails} />
        </div>
    );
};

export default JobsPage;