import { useNavigate } from "react-router-dom";

const OrganizerDashboard = () => {

  const navigate = useNavigate();
  // TEMP DATA (replace with backend APIs later)

  const stats = {
    totalEvents: 5,
    approvedEvents: 3,
    pendingEvents: 2,
    totalBookings: 124,
    totalRevenue: 48600,
  };

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Organizer Profile
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your events, bookings, and revenue
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          O
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Organizer Name
          </h2>
          <p className="text-gray-500">organizer01@gmail.com</p>
          <p className="text-sm text-green-600 mt-1">
            ✔ Verified Organizer
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Events" value={stats.totalEvents} />
        <StatCard title="Approved Events" value={stats.approvedEvents} />
        <StatCard title="Pending Events" value={stats.pendingEvents} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard
          title="Total Revenue"
          value={`₹ ${stats.totalRevenue}`}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/dashboard/create-event")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Create New Event
          </button>

          <button
            onClick={() => navigate("/dashboard/my-events")}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            View My Events
          </button>

          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
            View Bookings
          </button>
        </div>
      </div>

    </div>
  );
};

/* SMALL REUSABLE STAT CARD */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
};

export default OrganizerDashboard;
