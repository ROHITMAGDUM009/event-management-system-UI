import StatusBadge from "../components/StatusBadge";

const OrganizerBookings = () => {
    // TEMP DATA (replace with backend later)
    const bookings = [
        {
            id: 1,
            eventTitle: "Tech Conference 2026",
            userName: "Rohit Magdum",
            userEmail: "rohit@gmail.com",
            bookingDate: "2026-02-01",
            status: "PENDING",
            paymentStatus: "PENDING",
        },
        {
            id: 2,
            eventTitle: "Startup Meetup",
            userName: "Amit Sharma",
            userEmail: "amit@gmail.com",
            bookingDate: "2026-02-02",
            status: "APPROVED",
            paymentStatus: "PAID",
        },
        {
            id: 3,
            eventTitle: "Design Workshop",
            userName: "Sneha Patil",
            userEmail: "sneha@gmail.com",
            bookingDate: "2026-02-03",
            status: "REJECTED",
            paymentStatus: "N/A",
        },
    ];

    return (
        <div className="p-6">
            {/* HEADER */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Event Bookings Approval
            </h1>

            {/* TABLE */}
            <div className="bg-white shadow rounded p-6 overflow-x-auto">
                {bookings.length === 0 ? (
                    <p className="text-gray-500">
                        No bookings received yet.
                    </p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-left text-gray-600">
                                <th className="pb-3">Event</th>
                                <th className="pb-3">User</th>
                                <th className="pb-3">Email</th>
                                <th className="pb-3">Booking Date</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Payment</th>
                                <th className="pb-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 font-medium">
                                        {b.eventTitle}
                                    </td>

                                    <td className="py-3">{b.userName}</td>
                                    <td className="py-3">{b.userEmail}</td>
                                    <td className="py-3">{b.bookingDate}</td>

                                    <td className="py-3">
                                        <StatusBadge value={b.status} />
                                    </td>

                                    <td className="py-3">
                                        <StatusBadge value={b.paymentStatus} />
                                    </td>

                                    <td className="py-3 flex gap-2">
                                        {b.status === "PENDING" ? (
                                            <>
                                                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                                    Approve
                                                </button>

                                                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Action taken
                                            </span>
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
