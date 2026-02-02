import { useState } from "react";
import { createEvent } from "../../api/eventApi";

const CreateEvent = () => {


    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        eventType: "FREE",
        price: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // 🔜 Replace with backend API
        try {
            await createEvent(formData);
            alert("Event created successfully");
            navigate("/organizer/my-events");
        } catch {
            alert("Failed to create event");
        }
    };

    return (
        <div className="max-w-3xl mx-auto">

            {/* PAGE HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Create New Event
                </h1>
                <p className="text-gray-600">
                    Fill details and submit for admin approval
                </p>
            </div>

            {/* SUCCESS MESSAGE */}
            {message && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                    {message}
                </div>
            )}

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded p-6 space-y-5"
            >

                {/* TITLE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Event Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Tech Conference 2026"
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full border p-2 rounded"
                        placeholder="Describe your event..."
                    />
                </div>

                {/* LOCATION */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Pune, Mumbai, Online"
                    />
                </div>

                {/* DATE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Event Date
                    </label>
                    <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* EVENT TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Event Type
                    </label>
                    <select
                        name="eventType"
                        value={form.eventType}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="FREE">Free</option>
                        <option value="PAID">Paid</option>
                        <option value="PACKAGE">Package</option>
                    </select>
                </div>

                {/* PRICE (ONLY IF PAID) */}
                {form.eventType === "PAID" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ticket Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                            placeholder="499"
                        />
                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 text-white rounded ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Submitting..." : "Create Event"}
                    </button>

                    <button
                        type="reset"
                        className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                            setForm({
                                title: "",
                                description: "",
                                location: "",
                                eventDate: "",
                                eventType: "FREE",
                                price: "",
                            })
                        }
                    >
                        Reset
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreateEvent;
