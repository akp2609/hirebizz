import { useLocation, useParams } from 'react-router-dom';
import ApplicantCard from '../../components/employer/ApplicantCard.js';
import { useApplications } from '../../hooks/useApplication.js';
import { useEffect, useState } from 'react';
import { Users, Sparkles, Loader2, AlertTriangle } from 'lucide-react';

const Applications = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const { jobId } = useParams();
    const { applications, loading, error } = useApplications(jobId, refreshKey);
    const location = useLocation();
    const jobTitle = location.state?.jobTitle;

    const [localApps, setLocalApps] = useState([]);
    const handleRefresh = () => setRefreshKey((prev) => prev + 1);

    useEffect(() => {
        if (applications) {
            setLocalApps(applications);
        }
    }, [applications]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50 relative">
            <div className="max-w-5xl mx-auto p-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="relative inline-block">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Applicants for {jobTitle || `Job #${jobId}`}
                        </h2>
                        <div className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                    </div>
                    <p className="text-gray-600">
                        Review candidates and manage their application status.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <p className="text-red-600 font-semibold">
                            Something went wrong while fetching applicants.
                        </p>
                    </div>
                )}

                {/* Applicants List */}
                {!loading && !error && localApps.length > 0 && (
                    <div className="grid gap-6">
                        {localApps.map((application, idx) => (
                            <div
                                key={application._id}
                                className="transform transition-all duration-700"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                                }}
                            >
                                <ApplicantCard
                                    application={application}
                                    onStatusChange={handleRefresh}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && localApps.length === 0 && (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-8">
                            <div className="w-28 h-28 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <Users className="w-12 h-12 text-gray-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            No Applicants Yet
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Once candidates apply, their applications will appear here.
                        </p>
                    </div>
                )}
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default Applications;
