import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      
      <img
        src={event.image}
        alt={event.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {event.date} • {event.location}
        </p>

        <p className="text-gray-600 text-sm mt-3">
          {event.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-blue-600">
            ₹{event.price}
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
