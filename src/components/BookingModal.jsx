import { useState } from "react";
import { bookEvent } from "../api/bookingApi";

const BookingModal = ({ event, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    setLoading(true);
    setError("");
    try {
      await bookEvent(event.id);
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
          <h2 className="text-xl font-bold mb-4 text-green-600">Booking Confirmed!</h2>
          <p className="text-gray-600"><strong>{event.title}</strong></p>
          <p className="text-gray-500 text-sm mt-2">Your booking has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>

        <h2 className="text-xl font-bold mb-4">Book Event</h2>
        <p className="text-gray-600 mb-4">
          <strong>{event.title}</strong><br />
          {event.eventDate} • {event.location}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
        )}

        <div className="flex justify-between items-center mt-6">
          <span className="font-bold text-blue-600">
            {event.price > 0 ? `₹${event.price}` : "Free"}
          </span>

          <button
            type="button"
            onClick={handleBooking}
            disabled={loading}
            className={`px-5 py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
