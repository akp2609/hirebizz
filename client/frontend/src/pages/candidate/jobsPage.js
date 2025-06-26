import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import JobCard from '../../components/common/JobCard';
import JobFilters from '../../components/common/JobFilters';
import Pagination from '../../components/common/Pagination';
import { fetchJobs } from '../../services/jobService';
import { getUserRelevantJobs } from '../../services/userService';
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
    const { user } = useUser();

    const [selectedJob, setSelectedJob] = useState(null); // ✅ Track clicked job
    const [showDetailsModal, setShowDetailsModal] = useState(false); // ✅ Modal state

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
                    } else {
                        console.warn("Unexpected relevant jobs response:", res);
                        setRelevantJobs([]);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch relevant jobs:", err);
                    setRelevantJobs([]);
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

            {hasResume && (
                <>
                    <h2 className="text-xl font-bold mb-3">Recommended Jobs Based on Your Resume</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
                        {relevantJobs.map(job => (
                            <JobCard
                                key={job._id}
                                job={job}
                                score={job.similarity}
                                onClick={() => openJobDetails(job)} 
                            />
                        ))}
                    </div>
                </>
            )}

            <div>
                <h2 className="text-xl font-bold mb-3">All Jobs Posted</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map(job => (
                    <JobCard
                        key={job._id}
                        job={job}
                        onClick={() => openJobDetails(job)} // ✅ Make card clickable
                    />
                ))}
            </div>

            <Pagination page={filters.page} totalPages={totalPages} onPageChange={handlePageChange} />

            {/* ✅ Job Details Modal */}
            <JobDetailsModal
                job={selectedJob}
                isOpen={showDetailsModal}
                onClose={closeJobDetails}
            />
        </div>
    );
};

export default JobsPage;
