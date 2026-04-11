import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getApprovedEvents } from "../api/eventApi";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedEvents()
      .then((res) => setEvents(res.data ?? []))
      .catch((err) => console.error("Failed to fetch events:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover & Manage Events Seamlessly
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Book events, host experiences, and manage everything from one powerful platform.
          </p>

          <div className="flex justify-center gap-4">
            <a href="/events" className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100">
              Explore Events
            </a>

            <a href="/register" className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-700">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Upcoming Events
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500">No upcoming events at the moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 6).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
