const AdminUsers = () => {
    const users = [
        { id: 1, name: "Rohit", email: "user@gmail.com", enabled: true },
        { id: 2, name: "Amit", email: "test@gmail.com", enabled: false }
    ];
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-100">
                    <tr className="border-b text-left">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-3">{u.name}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3">
                                {u.enabled ? "Active" : "Blocked"}
                            </td>
                            <td className="p-3">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    {u.enabled ? "Block" : "Unblock"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
