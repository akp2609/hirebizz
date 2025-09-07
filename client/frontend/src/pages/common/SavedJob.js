import React, { useEffect, useState } from 'react';
import { MapPin, Building2, DollarSign, Eye, Trash2 } from 'lucide-react';
import { getUserSavedJobs } from '../../services/userService';
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
        navigate(`/jobs/${job._id}`);
    };

    const handleRemoveSaved = (id) => {
        setJobs((prev) => prev.filter((job) => job._id !== id));
        // TODO: Call backend API to remove saved job
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Saved Jobs
            </h1>

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
                    You haven’t saved any jobs yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <button
                                    onClick={() => handleRemoveSaved(job._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-2">
                                {job.title}
                            </h3>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Building2 className="w-4 h-4" />
                                    <span>{job.company?.name}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                {job.salary && (
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <DollarSign className="w-4 h-4" />
                                        <span>{job.salary}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleViewApply(job)}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium"
                            >
                                <Eye className="w-4 h-4" />
                                <span>View & Apply</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
