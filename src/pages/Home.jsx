import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getApprovedEvents } from "../api/eventApi";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ events: 0, users: 0, bookings: 0 });

  // Refs for scroll animations
  const featureRef = useRef(null);
  const trendingRef = useRef(null);
  const ctaRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({});

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Fetch events
  useEffect(() => {
    getApprovedEvents()
      .then((res) => {
        const approvedEvents = res.data ?? [];
        setEvents(approvedEvents);
        setStats({
          events: approvedEvents.length,
          users: Math.floor(Math.random() * 500) + 100,
          bookings: Math.floor(Math.random() * 1000) + 200,
        });
      })
      .catch((err) => console.error("Failed to fetch events:", err))
      .finally(() => setLoading(false));
  }, []);

  const trendingEvents = events.slice(0, 3);
  const upcomingEvents = events.slice(3, 9);

  // Hero slides data
  const heroSlides = [
    {
      title: "Discover Amazing Events",
      subtitle: "Find workshops, conferences, and experiences near you",
      cta: "Explore Events",
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
    },
    {
      title: "Host Your Own Event",
      subtitle: "Create, manage, and grow your audience effortlessly",
      cta: "Create Event",
      gradient: "from-purple-600 via-pink-600 to-red-600",
    },
    {
      title: "Book in Seconds",
      subtitle: "Simple checkout, instant confirmation, zero hassle",
      cta: "Browse Now",
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* ================= HERO SLIDER ================= */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
              <div className="text-center text-white w-full">
                {/* Badge */}
                <div
                  className={`inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  🎉 Welcome to Event Management System
                </div>

                {/* Main Heading */}
                <h1
                  className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  className={`text-xl text-white/90 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-200 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                  <Link
                    to="/events"
                    className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold 
                               hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                  >
                    🔍 {slide.cta}
                  </Link>
                  <Link
                    to="/register"
                    className="border-2 border-white px-8 py-4 rounded-full font-semibold 
                               hover:bg-white hover:text-blue-700 transition transform hover:scale-105"
                  >
                    🚀 Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </section>

      {/* ================= STATS SECTION — FIXED ================= */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-3 gap-8">
              <StatItem number={stats.events} label="Active Events" delay={0} />
              <StatItem number={stats.users} label="Happy Users" delay={100} />
              <StatItem number={stats.bookings} label="Bookings Made" delay={200} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section
        ref={featureRef}
        data-section="features"
        className={`py-20 bg-gray-50 transition-all duration-1000 ${visibleSections.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose EMS?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage events successfully
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎫"
              title="Easy Booking"
              description="Book events in seconds with our streamlined checkout process"
              color="blue"
              delay={0}
            />
            <FeatureCard
              icon="📊"
              title="Analytics Dashboard"
              description="Track bookings, revenue, and attendance in real-time"
              color="purple"
              delay={100}
            />
            <FeatureCard
              icon="🔒"
              title="Secure Payments"
              description="Safe and secure payment processing for all transactions"
              color="green"
              delay={200}
            />
            <FeatureCard
              icon="📱"
              title="Mobile Friendly"
              description="Access your events from any device, anywhere"
              color="orange"
              delay={300}
            />
            <FeatureCard
              icon="✉️"
              title="Email Notifications"
              description="Stay updated with automatic booking confirmations"
              color="pink"
              delay={400}
            />
            <FeatureCard
              icon="🎯"
              title="Smart Search"
              description="Find perfect events with advanced filtering options"
              color="indigo"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ================= TRENDING EVENTS CAROUSEL ================= */}
      <section
        ref={trendingRef}
        data-section="trending"
        className={`py-20 bg-white transition-all duration-1000 ${visibleSections.trending ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                🔥 Trending Events
              </h2>
              <p className="text-gray-600">Most popular events this week</p>
            </div>
            <Link
              to="/events"
              className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading events...</div>
          ) : trendingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              No trending events at the moment.
            </div>
          )}
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600">Find events that match your interests</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard emoji="💻" name="Technology" count="24 events" delay={0} />
            <CategoryCard emoji="🎵" name="Music" count="18 events" delay={100} />
            <CategoryCard emoji="🎨" name="Arts" count="12 events" delay={200} />
            <CategoryCard emoji="🏃" name="Sports" count="15 events" delay={300} />
            <CategoryCard emoji="📚" name="Education" count="20 events" delay={400} />
            <CategoryCard emoji="💼" name="Business" count="16 events" delay={500} />
            <CategoryCard emoji="🎭" name="Entertainment" count="22 events" delay={600} />
            <CategoryCard emoji="🍕" name="Food & Drink" count="10 events" delay={700} />
          </div>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                📅 Upcoming Events
              </h2>
              <p className="text-gray-600">Don't miss out on these amazing experiences</p>
            </div>
            <Link
              to="/events"
              className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading events...</div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              No upcoming events at the moment.
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        ref={ctaRef}
        data-section="cta"
        className={`py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-1000 ${visibleSections.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Host Your First Event?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of organizers who trust EMS to manage their events
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold 
                         hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              to="/events"
              className="border-2 border-white px-8 py-4 rounded-full font-semibold 
                         hover:bg-white hover:text-blue-700 transition"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SLIDER ================= */}
      <TestimonialsSection />

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to get notified about new events and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold 
                         hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// ================= HELPER COMPONENTS =================

const StatItem = ({ number, label, delay }) => (
  <div
    className="text-center animate-fadeInUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
      {number.toLocaleString()}+
    </div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, color, delay }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className={`w-16 h-16 ${colors[color]} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const CategoryCard = ({ emoji, name, count, delay }) => (
  <div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 
               transform hover:-translate-y-1 text-center cursor-pointer animate-fadeInUp"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
    <p className="text-sm text-gray-500">{count}</p>
  </div>
);

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "EMS made organizing my tech conference so easy! The booking system is seamless.",
      author: "Priya Sharma",
      role: "Tech Event Organizer",
      avatar: "👩‍💼",
    },
    {
      quote: "Best platform for managing events. The analytics dashboard helps me track everything.",
      author: "Rahul Verma",
      role: "Music Festival Organizer",
      avatar: "👨‍",
    },
    {
      quote: "Simple, intuitive, and reliable. I've hosted 20+ events without any issues.",
      author: "Sneha Patel",
      role: "Workshop Coordinator",
      avatar: "👩‍🎤",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What People Say
          </h2>
          <p className="text-gray-600">Trusted by event organizers worldwide</p>
        </div>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${index === currentTestimonial
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute inset-0 translate-x-8"
                }`}
            >
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center">
                <div className="text-6xl mb-6">{testimonial.avatar}</div>
                <p className="text-xl text-gray-700 mb-8 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-gray-800 text-lg">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;