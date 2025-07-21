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
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                        </svg>
                    </span>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search your job applications..."
                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ❌
                        </button>
                    )}
                </div>

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