import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block p-2 rounded transition ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/user" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/user/my-bookings" className={linkClass}>My Bookings</NavLink>
        {/* ✅ REMOVED — My Events (users don't create events) */}
        <NavLink to="/events" className={linkClass}>Browse Events</NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full text-sm"
      >
        Logout
      </button>
    </aside>
  );
};

export default UserSidebar;