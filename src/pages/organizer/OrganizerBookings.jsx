import { useState } from "react";
import StatusBadge from "../../components/StatusBadge";

const OrganizerBookings = () => {

    const [bookings, setBookings] = useState([
        {
            id: 1,
            eventName: "Tech Conference 2026",
            userName: "Rohit Magdum",
            eventDate: "2026-02-10",
            status: "PENDING",
            paymentStatus: "UNPAID",
        },
        {
            id: 2,
            eventName: "Startup Meetup",
            userName: "Amit Patil",
            eventDate: "2026-03-05",
            status: "APPROVED",
            paymentStatus: "PAID",
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setBookings((prev) =>
            prev.map((b) =>
                b.id === id ? { ...b, status: newStatus } : b
            )
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Event Bookings Approval
            </h1>

            <div className="bg-white shadow rounded p-6">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="pb-3">Event</th>
                            <th className="pb-3">User</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Booking Status</th>
                            <th className="pb-3">Payment</th>
                            <th className="pb-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b">
                                <td className="py-3">{b.eventName}</td>
                                <td className="py-3">{b.userName}</td>
                                <td className="py-3">{b.eventDate}</td>

                                <td className="py-3">
                                    <StatusBadge value={b.status} />
                                </td>

                                <td className="py-3">
                                    <StatusBadge value={b.paymentStatus} />
                                </td>

                                <td className="py-3 flex gap-2">
                                    {b.status === "PENDING" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(b.id, "APPROVED")}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => updateStatus(b.id, "REJECTED")}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {b.status !== "PENDING" && (
                                        <span className="text-gray-500 text-sm">
                                            Action Taken
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {bookings.length === 0 && (
                    <p className="text-gray-500 mt-4">
                        No bookings yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default OrganizerBookings;
