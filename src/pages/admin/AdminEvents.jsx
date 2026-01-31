const AdminEvents = () => {
    const events = [
        { id: 1, title: "Tech Conf", status: "PENDING" }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Event Approval</h1>

            {events.map(e => (
                <div key={e.id} className="bg-white p-4 shadow rounded mb-4">
                    <p className="font-semibold">{e.title}</p>

                    <div className="mt-3 flex gap-3">
                        <button className="bg-green-600 text-white px-3 py-1 rounded">
                            Approve
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded">
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminEvents;
