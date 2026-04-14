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

    // ─── FETCH ALL USERS → FILTER ONLY ROLE_USER ─────────
    const fetchCustomers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getAllUsers();
            // ✅ Filter only ROLE_USER → rename as Customers
            const onlyCustomers = res.data.filter(
                (u) => u.role === "ROLE_USER"
            );
            setCustomers(onlyCustomers);
        } catch (err) {
            setError("Failed to load customers. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // ─── SHOW TEMP SUCCESS MESSAGE ────────────────────────
    const showMessage = (msg) => {
        setActionMsg(msg);
        setTimeout(() => setActionMsg(""), 3000);
    };

    // ─── BLOCK / UNBLOCK ──────────────────────────────────
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus; // toggle
            await changeUserStatus(id, newStatus);
            showMessage(
                newStatus
                    ? "✅ Customer unblocked successfully"
                    : "🚫 Customer blocked successfully"
            );
            fetchCustomers(); // refresh
        } catch (err) {
            showMessage("❌ Failed to update status");
            console.error(err);
        }
    };

    // ─── MAKE ORGANIZER ───────────────────────────────────
    const handleMakeOrganizer = async (id, name) => {
        const confirm = window.confirm(
            `Promote "${name}" from Customer to Organizer?`
        );
        if (!confirm) return;
        try {
            await makeOrganizer(id);
            showMessage(`✅ ${name} is now an Organizer`);
            fetchCustomers(); // refresh — they will disappear from list
        } catch (err) {
            showMessage("❌ Failed to promote customer");
            console.error(err);
        }
    };

    // ─── DELETE CUSTOMER ──────────────────────────────────
    const handleDelete = async (id, name) => {
        const confirm = window.confirm(
            `Are you sure you want to delete customer "${name}"? This cannot be undone.`
        );
        if (!confirm) return;
        try {
            await deleteUser(id);
            showMessage(`🗑️ Customer "${name}" deleted`);
            fetchCustomers(); // refresh
        } catch (err) {
            showMessage("❌ Failed to delete customer");
            console.error(err);
        }
    };

    // ─── LOADING ──────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12
                          border-b-2 border-blue-600
                          mx-auto mb-4"></div>
                    <p className="text-gray-400 text-sm">
                        Loading customers...
                    </p>
                </div>
            </div>
        );
    }

    // ─── ERROR ────────────────────────────────────────────
    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchCustomers}
                        className="bg-blue-600 text-white px-4 py-2
                       rounded hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ─── MAIN RENDER ──────────────────────────────────────
    return (
        <div className="p-6">

            {/* ── HEADER ── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">
                        👤 All Customers
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage registered customers
                    </p>
                </div>

                {/* Customer Count Badge */}
                <div className="bg-blue-600 text-white px-4 py-2
                        rounded-lg text-sm font-medium">
                    Total Customers: {customers.length}
                </div>
            </div>

            {/* ── ACTION MESSAGE ── */}
            {actionMsg && (
                <div className="bg-gray-700 border border-gray-600
                        text-gray-100 px-4 py-3 rounded-lg
                        mb-4 text-sm">
                    {actionMsg}
                </div>
            )}

            {/* ── EMPTY STATE ── */}
            {customers.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-5xl mb-4">👤</p>
                    <p className="text-lg font-medium">No customers found</p>
                    <p className="text-sm mt-1">
                        Registered customers will appear here
                    </p>
                </div>
            ) : (

                /* ── TABLE ── */
                <div className="overflow-x-auto rounded-lg
                        border border-gray-700">
                    <table className="w-full text-sm text-left">

                        {/* TABLE HEAD */}
                        <thead className="bg-gray-700 text-gray-300
                              uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Customer Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>

                        {/* TABLE BODY */}
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr
                                    key={customer.id}
                                    className="border-t border-gray-700
                             hover:bg-gray-700/40 transition"
                                >
                                    {/* # */}
                                    <td className="px-6 py-4 text-gray-400">
                                        {index + 1}
                                    </td>

                                    {/* NAME */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar */}
                                            <div className="w-8 h-8 rounded-full
                                      bg-blue-600 flex items-center
                                      justify-center text-white
                                      font-bold text-sm">
                                                {customer.name
                                                    ? customer.name.charAt(0).toUpperCase()
                                                    : "C"}
                                            </div>
                                            <span className="text-gray-100 font-medium">
                                                {customer.name ?? "Unknown"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 text-gray-300">
                                        {customer.email ?? "—"}
                                    </td>

                                    {/* STATUS BADGE */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs
                                  font-semibold
                                  ${customer.enabled
                                                    ? "bg-green-900 text-green-300"
                                                    : "bg-red-900 text-red-300"
                                                }`}
                                        >
                                            {customer.enabled ? "✅ Active" : "🚫 Blocked"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 flex-wrap">

                                            {/* BLOCK / UNBLOCK */}
                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(
                                                        customer.id,
                                                        customer.enabled
                                                    )
                                                }
                                                className={`px-3 py-1 rounded text-xs
                                    font-medium text-white transition
                                    ${customer.enabled
                                                        ? "bg-red-600 hover:bg-red-700"
                                                        : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                            >
                                                {customer.enabled ? "Block" : "Unblock"}
                                            </button>

                                            {/* MAKE ORGANIZER */}
                                            <button
                                                onClick={() =>
                                                    handleMakeOrganizer(
                                                        customer.id,
                                                        customer.name
                                                    )
                                                }
                                                className="px-3 py-1 rounded text-xs
                                   font-medium text-white
                                   bg-purple-600 hover:bg-purple-700
                                   transition"
                                            >
                                                Make Organizer
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(customer.id, customer.name)
                                                }
                                                className="px-3 py-1 rounded text-xs
                                   font-medium text-white
                                   bg-gray-600 hover:bg-gray-500
                                   transition"
                                            >
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

            {/* ── REFRESH BUTTON ── */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={fetchCustomers}
                    className="flex items-center gap-2 text-sm
                     text-gray-400 hover:text-white transition"
                >
                    🔄 Refresh List
                </button>
            </div>

        </div>
    );
};

export default AdminUsers;