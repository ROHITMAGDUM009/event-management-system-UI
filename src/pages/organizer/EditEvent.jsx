import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        eventType: "FREE",
        price: "",
        approvalType: "AUTO",
        imageUrl: "",
        hasSeatLimit: false,
        totalSeats: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch event data
    useEffect(() => {
        API.get(`/events/${id}`)
            .then((res) => {
                const event = res.data;
                setForm({
                    title: event.title || "",
                    description: event.description || "",
                    location: event.location || "",
                    eventDate: event.eventDate || "",
                    eventType: event.eventType || "FREE",
                    price: event.price || "",
                    approvalType: event.approvalType || "AUTO",
                    imageUrl: event.imageUrl || "",
                    hasSeatLimit: event.hasSeatLimit || false,
                    totalSeats: event.totalSeats || "",
                });
            })
            .catch((err) => {
                setError("Failed to load event details");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const payload = {
                ...form,
                price: form.eventType === "PAID" ? Number(form.price) : null,
                hasSeatLimit: form.hasSeatLimit,
                totalSeats: form.hasSeatLimit ? Number(form.totalSeats) : null,
            };

            await API.put(`/events/${id}`, payload);
            setSuccess("✅ Event updated successfully!");
            setTimeout(() => navigate("/organizer/my-events"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update event");
        }
    };

    if (loading) return (
        <div className="p-10 text-center text-gray-600">Loading event details...</div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Event</h1>
            <p className="text-gray-600 mb-6">Update event details</p>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}

            {success && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 space-y-5">

                {/* TITLE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* LOCATION */}
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* DATE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Date</label>
                    <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* IMAGE URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* EVENT TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Type</label>
                    <select
                        name="eventType"
                        value={form.eventType}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="FREE">Free</option>
                        <option value="PAID">Paid</option>
                    </select>
                </div>

                {/* PRICE */}
                {form.eventType === "PAID" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Ticket Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                )}

                {/* SEAT LIMIT */}
                <div>
                    <label className="block text-sm font-medium mb-1">Seat Limit</label>
                    <select
                        name="hasSeatLimit"
                        value={form.hasSeatLimit}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value={false}>Unlimited Seats</option>
                        <option value={true}>Limited Seats</option>
                    </select>
                </div>

                {/* TOTAL SEATS */}
                {form.hasSeatLimit === "true" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Total Available Seats</label>
                        <input
                            type="number"
                            name="totalSeats"
                            value={form.totalSeats}
                            onChange={handleChange}
                            min="1"
                            max="10000"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                )}

                {/* APPROVAL TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Booking Approval Type</label>
                    <select
                        name="approvalType"
                        value={form.approvalType}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="AUTO">Auto-approve bookings</option>
                        <option value="MANUAL">Manual approval required</option>
                    </select>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white rounded bg-blue-600 hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/organizer/my-events")}
                        className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;