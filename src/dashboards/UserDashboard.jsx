import { useEffect, useState } from "react";
import { getMyBookings, payForBooking } from "../api/bookingApi";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handlePay = async (bookingId) => {
    try {
      await payForBooking(bookingId);
      alert("Payment successful!");
      fetchBookings();
    } catch (err) {
      alert("Payment failed");
    }
  };

  if (loading) return <p className="text-gray-500">Loading your bookings...</p>;

  const approved = bookings.filter(b => b.bookingStatus === "APPROVED").length;
  const pendingPayment = bookings.filter(b => b.paymentStatus === "PENDING").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Approved Bookings" value={approved} />
        <StatCard title="Pending Payments" value={pendingPayment} />
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-3">Event</th>
                  <th className="pb-3">Booking Status</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{b.event?.title || "—"}</td>
                    <td className="py-3">
                      <StatusBadge value={b.bookingStatus} />
                    </td>
                    <td className="py-3">
                      <StatusBadge value={b.paymentStatus} />
                    </td>
                    <td className="py-3">
                      {b.amount > 0 ? `₹${b.amount}` : "Free"}
                    </td>
                    <td className="py-3">
                      {b.paymentStatus === "PENDING" ? (
                        <button
                          onClick={() => handlePay(b.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          Pay Now
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
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const StatusBadge = ({ value }) => {
  const colors = {
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
    SUCCESS: "bg-green-100 text-green-700",
    NOT_REQUIRED: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[value] || "bg-gray-100"}`}>
      {value}
    </span>
  );
};

export default UserDashboard;