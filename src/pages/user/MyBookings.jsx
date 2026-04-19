import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import { getMyBookings } from "../../api/bookingApi";
import API from "../../api/axios";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data ?? []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (bookingId) => {
    const reason = window.prompt("Enter cancellation reason (optional):");
    if (reason === null) return;

    setCancellingId(bookingId);
    try {
      await API.post(`/bookings/${bookingId}/cancel`, { reason: reason || "No reason provided" });
      setMessage("✅ Booking cancelled successfully");
      fetchBookings();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Cancellation failed"}`);
    } finally {
      setCancellingId(null);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (loading) return <p className="text-gray-500 p-6">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {message && (
        <div className={`p-3 rounded mb-4 text-sm ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {message}
        </div>
      )}

      {bookings.length === 0 ? (
        /* ✅ ADDED CTA BUTTON */
        <div className="bg-white p-10 rounded shadow text-center">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't booked any events. Browse upcoming events and book your first one!
          </p>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium"
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">Event</th>
                <th className="p-4">Date</th>
                <th className="p-4">Tickets</th>
                <th className="p-4">Booking</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{b.event?.title || "Unknown"}</td>
                  <td className="p-4">{b.event?.eventDate || "—"}</td>
                  <td className="p-4">{b.ticketQuantity || 1}</td>
                  <td className="p-4">
                    <StatusBadge value={b.bookingStatus} />
                  </td>
                  <td className="p-4">
                    <StatusBadge value={b.paymentStatus} />
                  </td>
                  <td className="p-4">₹{b.amount ?? 0}</td>
                  <td className="p-4">
                    {b.bookingStatus === "APPROVED" && b.paymentStatus !== "FAILED" ? (
                      <button
                        onClick={() => handleCancel(b.id)}
                        disabled={cancellingId === b.id}
                        className={`px-3 py-1 rounded text-white text-sm ${cancellingId === b.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                          }`}
                      >
                        {cancellingId === b.id ? "..." : "Cancel"}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
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

export default MyBookings;