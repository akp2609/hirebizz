import { useEffect, useState } from "react";
import { getAllReports, updateReportStatus } from "../../services/reportService.js";
import ReportTable from "../../components/admin/ReportTable.js";

const ReportsPage = () => {
    const [activeReports, setActiveReports] = useState([]);
    const [dismissedReports, setDismissedReports] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const data = await getAllReports();
            const allReports = data.reports || [];

            setActiveReports(allReports.filter(r => r.status !== 'dismissed'));
            setDismissedReports(allReports.filter(r => r.status === 'dismissed'));
            setTotalPages(data.totalPages || 1);

        } catch (err) {
            setError("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    }

    const handleStatusChange = async (reportId, status) => {
        try {
            await updateReportStatus({ reportId, status });
            fetchReports();
        } catch (err) {
            alert("Failed to update job status");
        }
    }

    const onAction = async () => {
        //TODO
    }

    useEffect(() => {
        fetchReports();
    }, [page]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Reports</h1>

            {loading ? (
                <p>Loading reports...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-2 mt-6 text-gray-800">🚨 Active Reports</h2>
                    <ReportTable
                        reports={activeReports}
                        onAction={onAction}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onStatusChange={handleStatusChange}
                    />

                    <h2 className="text-xl font-semibold mb-2 mt-10 text-gray-800">🗃️ Dismissed Reports</h2>
                    <ReportTable
                        reports={dismissedReports}
                        onAction={onAction}
                        currentPage={1}
                        totalPages={1}
                        onPageChange={() => { }}
                        onStatusChange={() => { }}
                    />
                </>
            )}
        </div>
    )
}

export default ReportsPage;
