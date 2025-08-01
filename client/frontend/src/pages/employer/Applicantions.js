import { useLocation, useParams } from 'react-router-dom';
import ApplicantCard from '../../components/employer/ApplicantCard.js';
import { useApplications } from '../../hooks/useApplication.js';
import { useEffect, useState } from 'react';

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
        <div className="max-w-5xl mx-auto p-6">
            {!loading && (
                <h2 className="text-2xl font-bold mb-4">
                    Applicants for Job ID: {jobTitle}
                </h2>
            )}

            {loading ? (
                <p>Loading applicants...</p>
            ) : error ? (
                <p className="text-red-500">Something went wrong while fetching applicants.</p>
            ) : localApps.length > 0 ? (
                <div className="grid gap-4">
                    {localApps.map((application) => (
                        <ApplicantCard
                            key={application._id}
                            application={application}
                            onStatusChange={handleRefresh}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No applicants found for this job.</p>
            )}
        </div>
    );
};

export default Applications;
