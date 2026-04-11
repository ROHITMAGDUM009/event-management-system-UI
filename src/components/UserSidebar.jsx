import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/user" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2"}>
          Dashboard
        </NavLink>

        <NavLink to="/user/my-bookings" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2"}>
          My Bookings
        </NavLink>

        <NavLink to="/user/my-events" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2"}>
          My Events
        </NavLink>

        <NavLink to="/events" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2"}>
          Browse Events
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default UserSidebar;
