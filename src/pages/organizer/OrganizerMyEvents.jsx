import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

const OrganizerMyEvents = () => {
    // 🔹 TEMP STATIC

    const events = [
        {
            id: 1,
            title: "Tech Conference 2026",
            date: "2026-02-10",
            location: "Pune",
            type: "PAID",
            price: 499,
            status: "APPROVED",
        },
        {
            id: 2,
            title: "Startup Meetup",
            date: "2026-03-05",
            location: "Mumbai",
            type: "FREE",
            price: 0,
            status: "PENDING",
        },
        {
            id: 3,
            title: "Design Workshop",
            date: "2026-04-01",
            location: "Bangalore",
            type: "PAID",
            price: 299,
            status: "REJECTED",
        },
    ];
    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    My Events
                </h1>

                <button
                    onClick={() => navigate("/dashboard/create-event")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create Event
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white shadow rounded p-6 overflow-x-auto">
                {events.length === 0 ? (
                    <p className="text-gray-500">
                        You haven’t created any events yet.
                    </p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-left text-gray-600">
                                <th className="pb-3">Title</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Type</th>
                                <th className="pb-3">Price</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 font-medium">
                                        {event.title}
                                    </td>

                                    <td className="py-3">{event.date}</td>

                                    <td className="py-3">
                                        <span className="px-3 py-1 text-sm rounded bg-gray-200">
                                            {event.type}
                                        </span>
                                    </td>

                                    <td className="py-3">
                                        {event.type === "FREE"
                                            ? "Free"
                                            : `₹${event.price}`}
                                    </td>

                                    <td className="py-3">
                                        <StatusBadge value={event.status} />
                                    </td>

                                    <td className="py-3 flex gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/events/${event.id}`)
                                            }
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            View
                                        </button>

                                        {event.status === "PENDING" && (
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-not-allowed"
                                            >
                                                Waiting
                                            </button>
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

export default OrganizerMyEvents;
