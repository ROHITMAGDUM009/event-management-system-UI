import { useEffect, useState } from "react";
import { getAllUsers, removeOrganizer } from "../../api/adminApi";

const AdminOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizers = async () => {
    try {
      const res = await getAllUsers();
      const onlyOrganizers = res.data.filter((u) => u.role === "ROLE_ORGANIZER");
      setOrganizers(onlyOrganizers);
    } catch (err) {
      console.error("Failed to load organizers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const handleRemoveOrganizer = async (id) => {
    if (!window.confirm("Remove organizer role from this user?")) return;
    try {
      await removeOrganizer(id);
      fetchOrganizers();
    } catch (err) {
      alert("Failed to remove organizer");
    }
  };

  if (loading) return <p className="text-gray-500">Loading organizers...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Organizers</h1>

      {organizers.length === 0 ? (
        <p className="text-gray-500">No organizers found.</p>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.enabled ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemoveOrganizer(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove Organizer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrganizers;
