import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bookEvent } from "../api/bookingApi";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  // ✅ TICKET QUANTITY
  const [ticketQty, setTicketQty] = useState(1);
  const maxTickets = 10;

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBooking(true);
    setMessage("");
    try {
      await bookEvent({ eventId: event.id, ticketQuantity: ticketQty });
      setMessage(`🎉 Booking successful! ${ticketQty} ticket(s) confirmed.`);
      setMsgType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
      setMsgType("error");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
  if (!event) return <div className="p-10 text-center text-gray-600">Event not found</div>;

  const totalPrice = (event.price || 0) * ticketQty;
  const availableSeats = event.availableSeats;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded shadow overflow-hidden">

        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover" />
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
          <p className="text-gray-500 mt-2">{event.eventDate} • {event.location}</p>

          {event.eventType && (
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
              {event.eventType === "FREE" ? "Free Event" : "Paid Event"}
            </span>
          )}

          {event.hasSeatLimit && availableSeats !== null && (
            <span className="inline-block mt-2 ml-2 px-3 py-1 text-xs font-semibold text-white bg-purple-500 rounded">
              {availableSeats} seats remaining
            </span>
          )}

          <p className="text-gray-700 mt-6 leading-relaxed">{event.description}</p>

          {message && (
            <div className={`mt-4 px-4 py-3 rounded text-sm ${msgType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          {/* ✅ TICKET QUANTITY SELECTOR */}
          {user?.role === "ROLE_USER" && (
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <label className="block text-sm font-medium mb-2">Number of Tickets</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setTicketQty(Math.max(1, ticketQty - 1))}
                  className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 text-xl font-bold">−</button>
                <span className="text-2xl font-bold w-12 text-center">{ticketQty}</span>
                <button onClick={() => setTicketQty(Math.min(maxTickets, ticketQty + 1))}
                  className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 text-xl font-bold">+</button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Max {maxTickets} tickets per booking
                {availableSeats !== null && ` • ${availableSeats} seats available`}
              </p>
            </div>
          )}

          {/* ✅ PRICE SUMMARY */}
          {event.price > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ticket Price</span>
                <span>₹{event.price} × {ticketQty}</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold text-blue-600">₹{totalPrice}</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              {event.price > 0 ? `₹${event.price} per ticket` : "Free"}
            </span>

            {user?.role === "ROLE_USER" && (
              <button onClick={handleBook} disabled={booking}
                className={`px-6 py-3 rounded text-white ${booking ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
                {booking ? "Booking..." : `Book ${ticketQty > 1 ? ticketQty + " Tickets" : "Event"}`}
              </button>
            )}

            {!user && (
              <button onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Login to Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;