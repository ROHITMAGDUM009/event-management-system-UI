import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-8 text-blue-400">
        Admin Control
      </h2>

      <nav className="space-y-3">
        <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
        <NavLink to="/admin/organizers" className={linkClass}>Organizers</NavLink>
        <NavLink to="/admin/events" className={linkClass}>Events</NavLink>
        <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink>
      </nav>

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-2 rounded 
                     hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;