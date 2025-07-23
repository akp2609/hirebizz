import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/adminService";
import UserTable from "../../components/admin/UserTable";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = async (pageNum = 1) => {
        try {
            setLoading(true);
            const data = await getAllUsers(pageNum, 10);
            setUsers(data.users || []);
            setTotalPages(data.totalPage || 1);
        } catch (err) {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <UserTable users={users} onPageChange={setPage} currentPage={page} totalPages={totalPages} refreshUsers={fetchUsers}/>
            )}
        </div>
    );
};

export default ManageUsers;

