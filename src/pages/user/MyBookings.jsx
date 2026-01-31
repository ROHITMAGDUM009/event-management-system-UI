import StatusBadge from "../../components/StatusBadge";
import { useEffect, useState } from "react";
import { fetchMyBookings } from "../../api/bookingApi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings()
      .then(res => setBookings(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Bookings
        </h1>
      </div>

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
                <th className="p-4">Status</th>
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
                    <StatusBadge value={b.status} />
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
