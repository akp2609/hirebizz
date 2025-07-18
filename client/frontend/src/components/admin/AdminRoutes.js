import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayouts";
import DashboardHome from "../../pages/admin/AdminDashboardHome";
import ManageUsers from "../../pages/admin/ManageUsers";
import ManageJobs from "../../pages/admin/ManageJobs";
import ReportsPage from "../../pages/admin/ReportsPage";
import AdminUserDetailsPage from "../../pages/admin/AdminUserDetailsPage";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="users/:userId" element={<AdminUserDetailsPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
