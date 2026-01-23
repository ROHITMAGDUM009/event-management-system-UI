import StatusBadge from "../components/StatusBadge";

const UserDashboard = () => {
  // TEMP DATA (replace with backend later)
  const bookings = [
    {
      id: 1,
      eventName: "Tech Conference 2026",
      date: "2026-02-10",
      status: "APPROVED",
      paymentStatus: "PAID",
    },
    {
      id: 2,
      eventName: "Startup Meetup",
      date: "2026-03-05",
      status: "PENDING",
      paymentStatus: "PENDING",
    },
  ];

  return (
    <div className="p-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        User Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Approved Bookings</p>
          <p className="text-2xl font-bold">
            {bookings.filter(b => b.status === "APPROVED").length}
          </p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Pending Payments</p>
          <p className="text-2xl font-bold">
            {bookings.filter(b => b.paymentStatus === "PENDING").length}
          </p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Event</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-b">
                    <td className="py-3">{b.eventName}</td>
                    <td className="py-3">{b.date}</td>

                    <td className="py-3">
                      <StatusBadge value={b.status} />
                    </td>

                    <td className="py-3">
                      <StatusBadge value={b.paymentStatus} />
                    </td>

                    <td className="py-3 flex gap-2">
                      {b.paymentStatus === "PENDING" ? (
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                          Pay
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
    </div>
  );
};

export default UserDashboard;
