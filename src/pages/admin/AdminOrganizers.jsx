const AdminOrganizers = () => {
    const organizers = [
        { id: 1, name: "Org One", email: "org@gmail.com", approved: false }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Organizers</h1>
            {organizers.map(o => (
                <div key={o.id} className="bg-white p-4 shadow rounded mb-4">
                    <p><b>Name:</b> {o.name}</p>
                    <p><b>Email:</b> {o.email}</p>
                    {!o.approved && (
                        <button className="mt-3 bg-green-600 text-white px-4 py-1 rounded">
                            Approve Organizer
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
export default AdminOrganizers;