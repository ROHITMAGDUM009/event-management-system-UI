import { useState } from "react";
import EventCard from "../components/EventCard";

const Events = () => {

  // Temporary static data (later from backend)
  const allEvents = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "12 Feb 2026",
      location: "Pune",
      price: 499,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      description: "Join top tech leaders and developers."
    },
    {
      id: 2,
      title: "Music Night Live",
      date: "20 Mar 2026",
      location: "Mumbai",
      price: 799,
      image: "https://images.unsplash.com/photo-1518972559570-0d3a1dc4f9b4",
      description: "Live performances and DJs."
    },
    {
      id: 3,
      title: "Startup Meetup",
      date: "05 Apr 2026",
      location: "Bangalore",
      price: 299,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      description: "Meet founders and investors."
    },
    {
      id: 4,
      title: "Design Workshop",
      date: "18 Apr 2026",
      location: "Pune",
      price: 199,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      description: "Hands-on UI/UX workshop."
    }
  ];

  const [search, setSearch] = useState("");

  // Filter logic (basic)
  const filteredEvents = allEvents.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
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

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white p-4 rounded shadow mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            className="border p-2 rounded w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="border p-2 rounded w-full md:w-1/4">
            <option>All Locations</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
          </select>

          <select className="border p-2 rounded w-full md:w-1/4">
            <option>All Prices</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>

        {/* EVENTS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-600">
              No events found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Events;
