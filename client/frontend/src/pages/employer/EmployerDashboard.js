import React, { useEffect, useState } from 'react';
import ApplicantCard from '../../components/employer/ApplicantCard.js';
import ModalWrapper from '../../components/common/ModalWrapper.js';
import Pagination from '../../components/common/Pagination.js';
import PostJobForm from '../../components/employer/PostJobForm';
import { useUser } from '../../context/UserContext.js';
import { closeJobRequest, deleteJob, fetchEmployerJobs } from '../../services/jobService.js';
import MyJobCard from '../../components/employer/MyJobCard.js';
import { Link } from 'react-router-dom';

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
                const sortedJobs = res.jobs.sort((a, b) => {
                    return b.isActive - a.isActive;
                })
                setJobs(res.jobs || []);
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

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // TODO: Add pagination support to backend 
    };

    const handleCloseJob = async (jobId) => {
        try {
            const res = await closeJobRequest(jobId);
            loadEmployerJobs();

        } catch (err) {
            console.error("Error closing job:", err);
            alert("An error occurred while closing the job.");
        }
    }

    const handleDeleteJob = async (jobId) => {
        try {
            const res = await deleteJob(jobId);
            loadEmployerJobs();
        } catch (err) {
            console.error("Error deleting job:", err);
            alert("An error occurred while deleting the job.");
        }
    }

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Your Posted Jobs</h2>

            <div className="flex justify-between items-center mb-6 mt-2">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="w-full sm:w-[calc(33%-0.5rem)] md:w-[calc(33%-0.5rem)] lg:w-[calc(33%-0.5rem)] xl:w-[calc(33%-0.5rem)] px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />



                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => setShowPostModal(true)}
                >
                    + Post a New Job
                </button>
            </div>

            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : filteredJobs.length === 0 ? (
                <p className="text-gray-500">No jobs found for your search.</p>
            ) : (
                <div className="space-y-6">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="bg-white rounded-lg shadow p-4">
                            <MyJobCard job={job} onDelete={handleDeleteJob} onClose={handleCloseJob} o/>
                            <Link
                                to={`/employer/job/${job._id}/applications`}
                                state={{ jobTitle: job.title }}
                                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
                            >
                                View Applicants
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />

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
