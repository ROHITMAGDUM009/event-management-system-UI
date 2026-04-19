import { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import API from "../../api/axios";

const OrganizerBookings = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/organizer/bookings/my");
      // Group by event for summary
      const bookings = res.data ?? [];

      const total = bookings.filter(b => b.bookingStatus !== "CANCELLED").length;
      const approved = bookings.filter(b => b.bookingStatus === "APPROVED").length;
      const pending = bookings.filter(b => b.bookingStatus === "PENDING").length;
      const revenue = bookings.filter(b => b.paymentStatus === "SUCCESS")
        .reduce((sum, b) => sum + (b.amount || 0), 0);
      const totalTickets = bookings.filter(b => b.bookingStatus !== "CANCELLED")
        .reduce((sum, b) => sum + (b.ticketQuantity || 1), 0);

      setSummary({ total, approved, pending, revenue, totalTickets, bookings });
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await API.post(`/organizer/bookings/${id}/approve`);
      fetchBookings();
    } catch (err) {
      alert("Failed to approve booking");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    try {
      await API.post(`/organizer/bookings/${id}/reject`);
      fetchBookings();
    } catch (err) {
      alert("Failed to reject booking");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p className="text-gray-500 p-6">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Bookings</h1>

      {/* ✅ BOOKING SUMMARY */}
      {summary && (
        <div className="bg-white shadow rounded p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">📊 Booking Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Total Bookings" value={summary.total} color="blue" />
            <StatCard title="Approved" value={summary.approved} color="green" />
            <StatCard title="Pending" value={summary.pending} color="yellow" />
            <StatCard title="Total Tickets" value={summary.totalTickets} color="purple" />
            <StatCard title="Revenue" value={`₹${summary.revenue}`} color="emerald" />
          </div>
        </div>
      )}

      {/* BOOKINGS TABLE */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">All Bookings</h3>

        {summary.bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">User</th>
                <th className="pb-3">Event</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Tickets</th>
                <th className="pb-3">Booking Status</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {summary.bookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{b.userEmail || "—"}</td>
                  <td className="py-3">{b.event?.title || "—"}</td>
                  <td className="py-3">{b.event?.eventDate || "—"}</td>
                  <td className="py-3">{b.ticketQuantity || 1}</td>
                  <td className="py-3"><StatusBadge value={b.bookingStatus} /></td>
                  <td className="py-3"><StatusBadge value={b.paymentStatus} /></td>
                  <td className="py-3 flex gap-2">
                    {b.bookingStatus === "PENDING" ? (
                      <>
                        <button onClick={() => handleApprove(b.id)} disabled={processingId === b.id}
                          className={`px-3 py-1 rounded text-white text-sm ${processingId === b.id ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
                          {processingId === b.id ? "..." : "Approve"}
                        </button>
                        <button onClick={() => handleReject(b.id)} disabled={processingId === b.id}
                          className={`px-3 py-1 rounded text-white text-sm ${processingId === b.id ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}>
                          {processingId === b.id ? "..." : "Reject"}
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm">Action Taken</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className={`p-4 rounded text-center ${colors[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default OrganizerBookings;