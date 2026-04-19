import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";

const CreateEvent = () => {
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // ADD STATE for image file
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // ADD handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size must be less than 5MB");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // UPDATE handleSubmit for multipart
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            // Add event data as JSON
            const eventData = {
                title: form.title,
                description: form.description,
                location: form.location,
                eventDate: form.eventDate,
                eventType: form.eventType,
                price: form.eventType === "PAID" ? Number(form.price) : null,
                approvalType: form.approvalType,
                hasSeatLimit: form.hasSeatLimit === "true",
                totalSeats: form.hasSeatLimit === "true" ? Number(form.totalSeats) : null,
            };

            formData.append("event", new Blob([JSON.stringify(eventData)], {
                type: "application/json"
            }));

            // Add image file
            if (imageFile) {
                formData.append("image", imageFile);
            }

            await API.post("/events", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/organizer/my-events");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Event</h1>
            <p className="text-gray-600 mb-6">Fill details and submit for admin approval</p>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 space-y-5">

                {/* TITLE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange}
                        required className="w-full border p-2 rounded" placeholder="Tech Conference 2026" />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange}
                        required rows="4" className="w-full border p-2 rounded" placeholder="Describe your event..." />
                </div>

                {/* LOCATION */}
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange}
                        required className="w-full border p-2 rounded" placeholder="Pune, Mumbai, Online" />
                </div>

                {/* DATE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Date</label>
                    <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange}
                        required className="w-full border p-2 rounded" />
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Image</label>

                    {/* Preview */}
                    {imagePreview && (
                        <div className="mb-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        </div>
                    )}

                    {/* File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, GIF — Max 5MB (Optional)
                    </p>
                </div>

                {/* EVENT TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Event Type</label>
                    <select name="eventType" value={form.eventType} onChange={handleChange}
                        className="w-full border p-2 rounded">
                        <option value="FREE">Free</option>
                        <option value="PAID">Paid</option>
                    </select>
                </div>

                {/* PRICE */}
                {form.eventType === "PAID" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Ticket Price (₹)</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange}
                            required min="1" className="w-full border p-2 rounded" placeholder="499" />
                    </div>
                )}

                {/* SEAT LIMIT */}
                <div>
                    <label className="block text-sm font-medium mb-1">Seat Limit</label>
                    <select name="hasSeatLimit" value={form.hasSeatLimit} onChange={handleChange}
                        className="w-full border p-2 rounded">
                        <option value={false}>Unlimited Seats</option>
                        <option value={true}>Limited Seats</option>
                    </select>
                </div>

                {/* TOTAL SEATS */}
                {form.hasSeatLimit === "true" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Total Available Seats</label>
                        <input type="number" name="totalSeats" value={form.totalSeats} onChange={handleChange}
                            min="1" max="10000" className="w-full border p-2 rounded" placeholder="100" />
                        <p className="text-xs text-gray-500 mt-1">Maximum 10,000 seats allowed</p>
                    </div>
                )}

                {/* APPROVAL TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Booking Approval Type</label>
                    <select name="approvalType" value={form.approvalType} onChange={handleChange}
                        className="w-full border p-2 rounded">
                        <option value="AUTO">Auto-approve bookings</option>
                        <option value="MANUAL">Manual approval required</option>
                    </select>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={loading}
                        className={`px-6 py-2 text-white rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                        {loading ? "Submitting..." : "Create Event"}
                    </button>
                    <button type="reset" className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setForm({
                            title: "", description: "", location: "", eventDate: "",
                            eventType: "FREE", price: "", approvalType: "AUTO", imageUrl: "",
                            hasSeatLimit: false, totalSeats: ""
                        })}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;