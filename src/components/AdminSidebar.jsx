import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-3">
        <NavLink to="/admin" className="block hover:text-blue-400">
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className="block hover:text-blue-400">
          Users
        </NavLink>

        <NavLink to="/admin/organizers" className="block hover:text-blue-400">
          Organizers
        </NavLink>

        <NavLink to="/admin/events" className="block hover:text-blue-400">
          Events Approval
        </NavLink>

        <NavLink to="/admin/bookings" className="block hover:text-blue-400">
          Bookings
        </NavLink>

        <NavLink to="/admin/payments" className="block hover:text-blue-400">
          Payments
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
