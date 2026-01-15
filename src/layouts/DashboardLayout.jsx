import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">{user.role} Dashboard</h2>

        <nav className="space-y-3">
          <p className="hover:text-blue-400 cursor-pointer">Dashboard</p>

          {user.role === "ORGANIZER" && (
            <p className="hover:text-blue-400 cursor-pointer">Manage Events</p>
          )}

          {user.role === "ADMIN" && (
            <p className="hover:text-blue-400 cursor-pointer">Manage Users</p>
          )}
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
