import { useState } from "react";

const AdminEvents = () => {

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Tech Conf",
            organizer: "organizer@gmail.com",
            status: "PENDING"
        },
        {
            id: 2,
            title: "Startup Meetup",
            organizer: "organizer@gmail.com",
            status: "APPROVED"
        }
    ]);

    const updateStatus = (id, newStatus) => {
        setEvents(events.map(event =>
            event.id === id
                ? { ...event, status: newStatus }
                : event
        ));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Event Approvals</h1>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-3">Title</th>
                        <th>Organizer</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(event => (
                        <tr key={event.id} className="border-b">
                            <td className="p-3">{event.title}</td>
                            <td>{event.organizer}</td>
                            <td>{event.status}</td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => updateStatus(event.id, "APPROVED")}
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => updateStatus(event.id, "REJECTED")}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEvents;
