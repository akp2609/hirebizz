import React, { useEffect, useState } from 'react';
import { getUserSavedJobs } from '../../services/userService';
import JobCard from '../../components/common/JobCard';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const data = await getUserSavedJobs();
                setJobs(data || []);
            } catch (err) {
                console.error("❌ Failed to fetch saved jobs:", err.message);
                setError(err?.response?.data?.message || "Failed to load saved jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobs();
    }, []);

    const handleViewApply = (job) => {
        navigate(/jobs/${job._id});
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Your Saved Jobs</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-20">
                    <p className="text-lg text-gray-500">Loading saved jobs...</p>
                </div>
            ) : error ? (
                <div className="text-center mt-20 text-red-500 font-semibold">
                    {error}
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-20">
                    You haven't saved any jobs yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                            onClick={handleViewApply}
                            isSaved={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;