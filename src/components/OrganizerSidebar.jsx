import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OrganizerSidebar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      {/* TITLE */}
      <h2 className="text-xl font-bold mb-6 text-center">
        Organizer Panel
      </h2>

      {/* NAV LINKS */}
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/dashboard/my-events" className={linkClass}>
          🎫 My Events
        </NavLink>

        <NavLink to="/dashboard/create-event" className={linkClass}>
          ➕ Create Event
        </NavLink>

        <NavLink to="/dashboard/bookings" className={linkClass}>
          📄 Event Bookings
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default OrganizerSidebar;
