import { Link } from "react-router-dom";

const EventCard = ({ event }) => {

  // ✅ Format date
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // ✅ Format price
  const formattedPrice =
    event.price > 0
      ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(event.price)
      : "Free";

  // ✅ Resolve image URL (important for backend static path)
  const imageUrl = event.imageUrl
    ? `http://localhost:8080${event.imageUrl}`
    : "/default-event.png";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">

      {/* ✅ Always render image (with fallback) */}
      <img
        src={imageUrl}
        alt={event.title}
        className="h-48 w-full object-cover"
        onError={(e) => {
          e.target.src = "/default-event.png";
        }}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {formattedDate} • {event.location}
        </p>

        <p className="text-gray-600 text-sm mt-3 line-clamp-3">
          {event.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-blue-600">
            {formattedPrice}
          </span>

          <Link
            to={`/events/${event.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;