import { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { getMyBookings, payForBooking } from "../../api/bookingApi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

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

  const handlePay = async (bookingId) => {
    setPayingId(bookingId);
    try {
      await payForBooking(bookingId);
      fetchBookings();
    } catch (err) {
      alert("Payment failed");
    } finally {
      setPayingId(null);
    }
  };

  if (loading) return <p className="text-gray-500 p-6">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded shadow text-center text-gray-500">
          You haven't booked any events yet.
        </div>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">Event</th>
                <th className="p-4">Date</th>
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

                  <td className="p-4">
                    <StatusBadge value={b.bookingStatus} />
                  </td>

                  <td className="p-4">
                    <StatusBadge value={b.paymentStatus} />
                  </td>

                  <td className="p-4">₹{b.amount ?? 0}</td>

                  <td className="p-4 flex gap-2">
                    {b.paymentStatus === "PENDING" ? (
                      <button
                        onClick={() => handlePay(b.id)}
                        disabled={payingId === b.id}
                        className={`px-3 py-1 rounded text-white text-sm ${payingId === b.id ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                      >
                        {payingId === b.id ? "Processing..." : "Pay Now"}
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
