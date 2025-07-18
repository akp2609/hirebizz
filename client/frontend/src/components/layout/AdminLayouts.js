import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav className="flex flex-col gap-3">
                    <NavLink to="/admin" className={({ isActive }) => isActive ? "text-blue-400" : ""}>Dashboard</NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-blue-400" : ""}>Manage Users</NavLink>
                    <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? "text-blue-400" : ""}>Manage Jobs</NavLink>
                    <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "text-blue-400" : ""}>Reports</NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;