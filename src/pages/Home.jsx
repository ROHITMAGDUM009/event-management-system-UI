import EventCard from "../components/EventCard";

const Home = () => {

  // TEMPORARY DATA (Later comes from backend)
  const events = [
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
      description: "Experience live performances and DJs."
    },
    {
      id: 3,
      title: "Startup Meetup",
      date: "05 Apr 2026",
      location: "Bangalore",
      price: 299,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      description: "Network with founders and investors."
    }
  ];

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
            <button className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100">
              Explore Events
            </button>

            <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-700">
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Upcoming Events
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
