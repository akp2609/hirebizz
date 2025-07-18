import { useEffect, useState } from "react";
import { getAllJobs, updateJobStatus } from "../../services/adminService";
import JobTable from "../../components/admin/JobTable";
import JobDetailsModal from "../../components/candidate/JobDetailsModal";


const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await getAllJobs(page, 10);
            setJobs(data.jobs || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (jobId, status) => {
        try {
            await updateJobStatus({ jobId, status });
            fetchJobs();
        } catch (err) {
            alert("Failed to update job status");
        }
    };

    const openModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedJob(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <JobTable
                    jobs={jobs}
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onStatusChange={handleStatusChange}
                    onTitleClick={openModal}
                />
            )}

            <JobDetailsModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={closeModal}
                isAdminView={true}
            />
        </div>
    );
};

export default ManageJobs;
