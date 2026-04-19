import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../api/eventApi";
import StatusBadge from "../../components/StatusBadge";

const OrganizerMyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyEvents()
      .then((res) => setEvents(res.data ?? []))
      .catch((err) => console.error("Failed to load my events", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500 p-6">Loading events...</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Events</h1>

        <button
          onClick={() => navigate("/organizer/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Event
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded p-6 overflow-x-auto">
        {events.length === 0 ? (
          <p className="text-gray-500">You haven't created any events yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="pb-3">Title</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Seats</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => {
                // ✅ Editable if PENDING or before lock date
                const isEditable = event.status === "PENDING";

                return (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{event.title}</td>
                    <td className="py-3">{event.eventDate}</td>
                    <td className="py-3">{event.location}</td>
                    <td className="py-3">
                      <span className="px-3 py-1 text-sm rounded bg-gray-200">
                        {event.eventType === "FREE" ? "Free" : "Paid"}
                      </span>
                    </td>
                    <td className="py-3">
                      {event.hasSeatLimit
                        ? `${event.availableSeats !== null ? event.availableSeats : 0}/${event.totalSeats}`
                        : "∞"}
                    </td>
                    <td className="py-3">
                      {event.eventType === "FREE" ? "Free" : `₹${event.price}`}
                    </td>
                    <td className="py-3">
                      <StatusBadge value={event.status} />
                    </td>
                    <td className="py-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        View
                      </button>

                      {/* ✅ FIXED — Edit button with navigation */}
                      {isEditable ? (
                        <button
                          onClick={() => navigate(`/organizer/edit-event/${event.id}`)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          Edit
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm self-center">
                          🔒 Locked
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrganizerMyEvents;