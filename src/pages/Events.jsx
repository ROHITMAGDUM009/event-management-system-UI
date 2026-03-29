import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import { getApprovedEvents } from "../api/eventApi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await getApprovedEvents();
        setEvents(res.data ?? []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("We could not load events right now. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        event.title?.toLowerCase().includes(normalizedSearch)
      ),
    [events, normalizedSearch]
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Events</h1>
          <p className="text-gray-600 mt-1">Browse and book upcoming events</p>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            type="text"
            placeholder="Search events by title..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* SEARCH RESULT META */}
        {!isLoading && !error && (
          <p className="text-sm text-gray-600 mb-6">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        )}

        {/* LOADING / ERROR / EVENTS GRID */}
        {isLoading ? (
          <div className="bg-white p-6 rounded shadow text-gray-600">Loading events...</div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded">
            {error}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-gray-600 col-span-full">
                No events found. Try a different search keyword.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
