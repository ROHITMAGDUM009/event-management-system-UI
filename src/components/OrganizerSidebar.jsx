import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OrganizerSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-center text-blue-400">
        Organizer Panel
      </h2>

      <nav className="space-y-2">
        <NavLink to="/organizer" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/organizer/my-events" className={linkClass}>My Events</NavLink>
        <NavLink to="/organizer/create-event" className={linkClass}>Create Event</NavLink>
        <NavLink to="/organizer/bookings" className={linkClass}>Event Bookings</NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 
                   text-white py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default OrganizerSidebar;