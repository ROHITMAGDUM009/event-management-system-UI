import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../api/eventApi";
import { getOrganizerBookings } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, bookingsRes] = await Promise.all([
          getMyEvents(),
          getOrganizerBookings(),
        ]);
        setEvents(eventsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Failed to load organizer data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;

  const approved = events.filter(e => e.status === "APPROVED").length;
  const pending = events.filter(e => e.status === "PENDING").length;
  const revenue = bookings
    .filter(b => b.paymentStatus === "SUCCESS")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Organizer Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your events, bookings, and revenue</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Events" value={events.length} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Revenue" value={`₹ ${revenue}`} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigate("/organizer/create-event")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Create New Event
          </button>
          <button onClick={() => navigate("/organizer/my-events")}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            View My Events
          </button>
          <button onClick={() => navigate("/organizer/bookings")}
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

export default OrganizerDashboard;