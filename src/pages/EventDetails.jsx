import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApprovedEvents } from "../api/eventApi";
import BookingModal from "../components/BookingModal";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    getApprovedEvents()
      .then((res) => {
        const found = (res.data ?? []).find((e) => e.id === Number(id));
        setEvent(found || null);
      })
      .catch((err) => console.error("Failed to fetch event:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-600">Loading event details...</div>;
  if (!event) return <div className="p-10 text-center text-gray-600">Event not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded shadow overflow-hidden">
        {/* CONTENT */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

          <p className="text-gray-500 mt-2">
            {event.eventDate} • {event.location}
          </p>

          {event.eventType && (
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
              {event.eventType}
            </span>
          )}

          <p className="text-gray-700 mt-6 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-8 flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              {event.price > 0 ? `₹${event.price}` : "Free"}
            </span>

            <button
              onClick={() => setShowBooking(true)}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Book Event
            </button>
          </div>
        </div>
      </div>
      {showBooking && (
        <BookingModal event={event} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default EventDetails;
