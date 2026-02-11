import { useParams } from "react-router-dom";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

const EventDetails = () => {
  const { id } = useParams(); // URL param
  const [showBooking, setShowBooking] = useState(false);

  // TEMP DATA (later comes from backend)
  const events = [
    {
      id: "1",
      title: "Tech Conference 2026",
      date: "12 Feb 2026",
      location: "Pune",
      price: 499,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      description:
        "A full-day conference with top tech speakers, hands-on sessions, and networking opportunities.",
    },
    {
      id: "2",
      title: "Music Night Live",
      date: "20 Mar 2026",
      location: "Mumbai",
      price: 799,
      image: "https://images.unsplash.com/photo-1518972559570-0d3a1dc4f9b4",
      description: "Enjoy live music performances by famous artists and DJs.",
    },
    {
      id: "3",
      title: "Startup Meetup",
      date: "05 Apr 2026",
      location: "Bangalore",
      price: 299,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      description:
        "Meet startup founders, investors, and learn how to scale your business.",
    },
  ];

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="p-10 text-center text-gray-600">Event not found</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded shadow overflow-hidden">
        {/* IMAGE */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover"
        />

        {/* CONTENT */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

          <p className="text-gray-500 mt-2">
            {event.date} • {event.location}
          </p>

          <p className="text-gray-700 mt-6 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-8 flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ₹{event.price}
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
