import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        setError("Failed to load dashboard stats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
        <StatCard title="Organizers" value={stats.totalOrganizers} color="purple" />
        <StatCard title="Total Events" value={stats.totalEvents} color="green" />
        <StatCard title="Pending Approvals" value={stats.pendingEvents} color="yellow" />
        <StatCard title="Total Bookings" value={stats.totalBookings} color="indigo" />
        <StatCard title="Revenue (INR)" value={`INR ${stats.totalRevenue}`} color="emerald" />
      </div>
    </div>
  );
};

const borderColors = {
  blue: "border-blue-500",
  purple: "border-purple-500",
  green: "border-green-500",
  yellow: "border-yellow-500",
  indigo: "border-indigo-500",
  emerald: "border-emerald-500",
};

const StatCard = ({ title, value, color = "blue" }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 border-l-4 ${borderColors[color] ?? borderColors.blue}`}>
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
