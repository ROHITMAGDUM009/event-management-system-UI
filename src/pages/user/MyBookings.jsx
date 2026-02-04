import StatusBadge from "../../components/StatusBadge";

const MyBookings = () => {
  // 🔹 TEMP STATIC DATA (NO BACKEND)
  const bookings = [
    {
      id: 1,
      eventName: "Tech Conference 2026",
      eventDate: "2026-02-10",
      location: "Pune",
      bookingStatus: "APPROVED",
      paymentStatus: "SUCCESS",
      amount: 499,
    },
    {
      id: 2,
      eventName: "Startup Meetup",
      eventDate: "2026-03-15",
      location: "Mumbai",
      bookingStatus: "PENDING",
      paymentStatus: "PENDING",
      amount: 299,
    },
    {
      id: 3,
      eventName: "Design Workshop",
      eventDate: "2026-04-01",
      location: "Bangalore",
      bookingStatus: "APPROVED",
      paymentStatus: "NOT_REQUIRED",
      amount: 0,
    },
  ];

  return (
    <div className="p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Bookings
      </h1>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded shadow text-center text-gray-500">
          You haven’t booked any events yet.
        </div>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">Event</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Booking</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{b.eventName}</td>
                  <td className="p-4">{b.eventDate}</td>
                  <td className="p-4">{b.location}</td>

                  <td className="p-4">
                    <StatusBadge value={b.bookingStatus} />
                  </td>

                  <td className="p-4">
                    <StatusBadge value={b.paymentStatus} />
                  </td>

                  <td className="p-4">₹{b.amount}</td>

                  <td className="p-4 flex gap-2">
                    {b.paymentStatus === "PENDING" ? (
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Pay Now
                      </button>
                    ) : (
                      <button className="bg-gray-300 px-3 py-1 rounded cursor-not-allowed">
                        Paid
                      </button>
                    )}

                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      View
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
export default MyBookings;
