import { useEffect, useState } from "react"
import { getMyJobApplications } from "../../services/applicationService";
import ApplicationCard from "../../components/candidate/ApplicationCard";
import LoadingSpinner from "../../components/common/LoadingSpinner"


const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 400);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const apps = await getMyJobApplications({
                    search: searchTerm,
                    sortBy: "appliedAt",
                    order: "desc"
                });
                setApplications(apps);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [debouncedSearch]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500 text-sm">{error}</p>;

    return (
        <div className="space-y-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search job title or cover letter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

          
            {applications.length === 0 ? (
                <p className="text-gray-600">You have not applied to any jobs yet.</p>
            ) : (
                applications.map((application) => (
                    <ApplicationCard key={application._id} application={application} />
                ))
            )}
        </div>
    );
}

export default MyApplications;