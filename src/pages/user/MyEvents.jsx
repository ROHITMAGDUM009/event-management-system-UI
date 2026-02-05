import { useState } from "react";

const MyEvents = () => {
  // TEMP DATA (later from backend)
  const [events] = useState([
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "2026-02-10",
      location: "Pune",
      status: "APPROVED",
      price: 499,
    },
    {
      id: 2,
      title: "Startup Meetup",
      date: "2026-03-05",
      location: "Mumbai",
      status: "PENDING",
      price: 0,
    },
  ]);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Events
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Create Event
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        {events.length === 0 ? (
          <p className="text-gray-500">
            You haven’t created any events yet.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">Title</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b">
                  <td className="py-3">{event.title}</td>
                  <td className="py-3">{event.date}</td>
                  <td className="py-3">{event.location}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded text-sm text-white ${event.status === "APPROVED"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                        }`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td className="py-3">
                    {event.price > 0 ? `₹${event.price}` : "Free"}
                  </td>

                  <td className="py-3 flex gap-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>

                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
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

export default MyEvents;
