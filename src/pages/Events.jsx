import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../api/eventApi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents()
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  // Filter events
  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            All Events
          </h1>
          <p className="text-gray-600 mt-1">
            Browse and book upcoming events
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded shadow mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search events..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* EVENTS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-600">No events found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Events;
