import { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { getOrganizerBookings, approveBooking, rejectBooking } from "../../api/bookingApi";

const OrganizerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await getOrganizerBookings();
      setBookings(res.data ?? []);
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
      await approveBooking(id);
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
      await rejectBooking(id);
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Bookings Approval</h1>

      <div className="bg-white shadow rounded p-6">
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">User</th>
                <th className="pb-3">Event</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Booking Status</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{b.userEmail || "—"}</td>
                  <td className="py-3">{b.event?.title || "—"}</td>
                  <td className="py-3">{b.event?.eventDate || "—"}</td>

                  <td className="py-3">
                    <StatusBadge value={b.bookingStatus} />
                  </td>

                  <td className="py-3">
                    <StatusBadge value={b.paymentStatus} />
                  </td>

                  <td className="py-3 flex gap-2">
                    {b.bookingStatus === "PENDING" ? (
                      <>
                        <button
                          onClick={() => handleApprove(b.id)}
                          disabled={processingId === b.id}
                          className={`px-3 py-1 rounded text-white text-sm ${processingId === b.id ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                        >
                          {processingId === b.id ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(b.id)}
                          disabled={processingId === b.id}
                          className={`px-3 py-1 rounded text-white text-sm ${processingId === b.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                        >
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

export default OrganizerBookings;
