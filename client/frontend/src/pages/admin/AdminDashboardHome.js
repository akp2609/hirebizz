import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { getAdminStats } from "../../services/adminService";

const AdminDashboardHome = () => {
    const [loading,setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobs: 0,
        totalApplications: 0,
        totalReports: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await getAdminStats();
                setStats(res);
                 
            } catch (err) {
                console.error("Failed to load stats", err);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const chartData = {
        series: [
            {
                name: "Counts",
                data: [
                    stats.totalUsers,
                    stats.totalJobs,
                    stats.totalApplications,
                    stats.totalReports,
                ],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 300,
            },
            xaxis: {
                categories: ["Users", "Jobs", "Applications", "Reports"],
            },
        },
    };

    if (loading) return <p className="text-gray-600">Loading statistics...</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">{stats.totalJobs}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-purple-600">{stats.totalApplications}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-600">{stats.totalReports}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={300} />
            </div>
        </div>
    );
};

export default AdminDashboardHome;
