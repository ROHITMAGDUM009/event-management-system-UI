import { useEffect, useState } from "react";
import {
    getAllUsers,
    changeUserStatus,
    makeOrganizer,
    deleteUser,
} from "../../api/adminApi";

const AdminUsers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionMsg, setActionMsg] = useState("");

    // ─── Fetch only ROLE_USER ─────────────────────────────────
    const fetchCustomers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getAllUsers();
            const onlyCustomers = res.data.filter(
                (u) => u.role === "ROLE_USER"
            );
            setCustomers(onlyCustomers);
        } catch (err) {
            setError("Failed to load customers.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCustomers(); }, []);

    const showMessage = (msg) => {
        setActionMsg(msg);
        setTimeout(() => setActionMsg(""), 3000);
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await changeUserStatus(id, !currentStatus);
            showMessage(!currentStatus
                ? "✅ Customer unblocked"
                : "🚫 Customer blocked");
            fetchCustomers();
        } catch {
            showMessage("❌ Failed to update status");
        }
    };

    const handleMakeOrganizer = async (id, name) => {
        if (!window.confirm(`Promote "${name}" to Organizer?`)) return;
        try {
            await makeOrganizer(id);
            showMessage(`✅ ${name} is now an Organizer`);
            fetchCustomers();
        } catch {
            showMessage("❌ Failed to promote");
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(
            `Delete customer "${name}"? Cannot be undone.`
        )) return;
        try {
            await deleteUser(id);
            showMessage(`🗑️ "${name}" deleted`);
            fetchCustomers();
        } catch {
            showMessage("❌ Failed to delete");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12
                        border-b-2 border-blue-600
                        mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchCustomers}
                    className="bg-blue-600 text-white px-4 py-2
                           rounded hover:bg-blue-700">
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        All Customers
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage registered customers
                    </p>
                </div>
                <span className="bg-blue-600 text-white px-4 py-2
                         rounded-lg text-sm font-medium">
                    Total: {customers.length}
                </span>
            </div>

            {/* Action message */}
            {actionMsg && (
                <div className="bg-blue-50 border border-blue-200
                        text-blue-800 px-4 py-3 rounded
                        mb-4 text-sm">
                    {actionMsg}
                </div>
            )}

            {/* Empty state */}
            {customers.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-5xl mb-4">👤</p>
                    <p className="text-lg font-medium">No customers found</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg
                        border border-gray-200 bg-white shadow">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600
                              uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={customer.id}
                                    className="border-t hover:bg-gray-50 transition">

                                    <td className="px-6 py-4 text-gray-400">
                                        {index + 1}
                                    </td>

                                    {/* ✅ FIXED — use fullName */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full
                                      bg-blue-600 flex items-center
                                      justify-center text-white
                                      font-bold text-sm">
                                                {customer.fullName
                                                    ? customer.fullName.charAt(0).toUpperCase()
                                                    : "?"}
                                            </div>
                                            <span className="font-medium text-gray-800">
                                                {customer.fullName ?? "Unknown"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {customer.email ?? "—"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full 
                                      text-xs font-semibold
                      ${customer.enabled
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"}`}>
                                            {customer.enabled ? "✅ Active" : "🚫 Blocked"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 flex-wrap">

                                            <button
                                                onClick={() => handleToggleStatus(
                                                    customer.id, customer.enabled
                                                )}
                                                className={`px-3 py-1 rounded text-xs
                                    font-medium text-white transition
                          ${customer.enabled
                                                        ? "bg-red-600 hover:bg-red-700"
                                                        : "bg-green-600 hover:bg-green-700"}`}>
                                                {customer.enabled ? "Block" : "Unblock"}
                                            </button>

                                            <button
                                                onClick={() => handleMakeOrganizer(
                                                    customer.id, customer.fullName
                                                )}
                                                className="px-3 py-1 rounded text-xs
                                   font-medium text-white
                                   bg-purple-600 hover:bg-purple-700">
                                                Make Organizer
                                            </button>

                                            <button
                                                onClick={() => handleDelete(
                                                    customer.id, customer.fullName
                                                )}
                                                className="px-3 py-1 rounded text-xs
                                   font-medium text-white
                                   bg-gray-600 hover:bg-gray-500">
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6 flex justify-end">
                <button
                    onClick={fetchCustomers}
                    className="text-sm text-gray-500 hover:text-gray-800">
                    🔄 Refresh
                </button>
            </div>

        </div>
    );
};

export default AdminUsers;