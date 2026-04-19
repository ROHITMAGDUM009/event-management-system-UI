import { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { approveEvent, getAllEventsAdmin, rejectEvent } from "../../api/adminApi";
import API from "../../api/axios";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllEventsAdmin();
      setEvents(res.data ?? []);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      fetchEvents();
    } catch (err) {
      alert("Failed to approve event");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this event?")) return;
    try {
      await rejectEvent(id);
      fetchEvents();
    } catch (err) {
      alert("Failed to reject event");
    }
  };

  const handleDelete = async (id, title) => {
    const reason = window.prompt(`Delete event "${title}"?\nEnter reason (required):`);
    if (!reason) return;

    try {
      await API.put(`/admin/events/${id}/delete`, { reason });
      setMessage(`✅ Event "${title}" deleted`);
      setTimeout(() => setMessage(""), 3000);
      fetchEvents();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Delete failed"}`);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (loading) return <p className="text-gray-500">Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Approvals</h1>

      {message && (
        <div className={`p-3 rounded mb-4 text-sm ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {message}
        </div>
      )}

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Organizer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{event.title}</td>
                  <td className="p-3">{event.createdBy ?? "N/A"}</td>
                  <td className="p-3">{event.eventDate ?? "N/A"}</td>
                  <td className="p-3">
                    <StatusBadge value={event.status} />
                  </td>
                  <td className="p-3">
                    {event.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(event.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(event.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      /* ✅ REMOVED "Action Taken" text */
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={fetchEvents}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );
};

export default AdminEvents;