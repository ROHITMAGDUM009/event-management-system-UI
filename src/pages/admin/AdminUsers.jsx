import { useEffect, useState } from "react";
import { getAllUsers, changeUserStatus, makeOrganizer, deleteUser } from "../../api/adminApi";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to load users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await changeUserStatus(id, !currentStatus);
            fetchUsers(); // refresh
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleMakeOrganizer = async (id) => {
        try {
            await makeOrganizer(id);
            alert("User promoted to Organizer!");
            fetchUsers();
        } catch (err) {
            alert("Failed to promote user");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (err) {
            alert("Failed to delete user");
        }
    };

    if (loading) return <p className="text-gray-500">Loading users...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">All Users</h1>

            <div className="bg-white shadow rounded overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{u.fullName}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs ${u.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {u.enabled ? "Active" : "Blocked"}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleToggleStatus(u.id, u.enabled)}
                                        className={`px-3 py-1 rounded text-white text-sm ${u.enabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                                    >
                                        {u.enabled ? "Block" : "Unblock"}
                                    </button>
                                    {u.role === "ROLE_USER" && (
                                        <button
                                            onClick={() => handleMakeOrganizer(u.id)}
                                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Make Organizer
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;