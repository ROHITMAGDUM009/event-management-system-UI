import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      setError("Failed to load dashboard stats. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ─── LOADING STATE ───────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 
                          border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ─── ERROR STATE ─────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="bg-blue-600 text-white px-4 py-2 rounded 
                       hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD ──────────────────────────────────────
  return (
    <div className="p-6">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of your Event Management System
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 bg-blue-600 text-white 
                     px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {/* ── STAT CARDS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon="👤"
          color="blue"
          subtitle="Registered users"
        />

        <StatCard
          title="Organizers"
          value={stats?.totalOrganizers ?? 0}
          icon="🎪"
          color="purple"
          subtitle="Active organizers"
        />

        <StatCard
          title="Total Events"
          value={stats?.totalEvents ?? 0}
          icon="📅"
          color="green"
          subtitle="All events in system"
        />

        <StatCard
          title="Pending Approvals"
          value={stats?.pendingEvents ?? 0}
          icon="⏳"
          color="yellow"
          subtitle="Events awaiting review"
        />

        <StatCard
          title="Total Bookings"
          value={stats?.totalBookings ?? 0}
          icon="🎟️"
          color="indigo"
          subtitle="All bookings made"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats?.totalRevenue ?? 0}`}
          icon="💰"
          color="emerald"
          subtitle="Total revenue collected"
        />

      </div>

      {/* ── QUICK SUMMARY BAR ── */}
      <div className="mt-10 bg-white rounded-lg shadow p-5 
                      border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          📊 Quick Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 
                        text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✔</span>
            <span>
              Approved Events:{" "}
              <strong>
                {(stats?.totalEvents ?? 0) - (stats?.pendingEvents ?? 0)}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">⏳</span>
            <span>
              Pending Events:{" "}
              <strong>{stats?.pendingEvents ?? 0}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">👥</span>
            <span>
              Total Members:{" "}
              <strong>
                {(stats?.totalUsers ?? 0) + (stats?.totalOrganizers ?? 0)}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-indigo-500 font-bold">🎟️</span>
            <span>
              Bookings Per Event:{" "}
              <strong>
                {stats?.totalEvents > 0
                  ? (
                    (stats?.totalBookings ?? 0) /
                    (stats?.totalEvents ?? 1)
                  ).toFixed(1)
                  : 0}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">💰</span>
            <span>
              Avg Revenue / Event:{" "}
              <strong>
                ₹
                {stats?.totalEvents > 0
                  ? (
                    (stats?.totalRevenue ?? 0) /
                    (stats?.totalEvents ?? 1)
                  ).toFixed(0)
                  : 0}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-purple-500 font-bold">📈</span>
            <span>
              Organizer Ratio:{" "}
              <strong>
                {stats?.totalUsers > 0
                  ? (
                    ((stats?.totalOrganizers ?? 0) /
                      ((stats?.totalUsers ?? 1) +
                        (stats?.totalOrganizers ?? 0))) *
                    100
                  ).toFixed(1)
                  : 0}
                %
              </strong>
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

// ─── STAT CARD COMPONENT ─────────────────────────────────────────────────────

const borderColors = {
  blue: "border-blue-500",
  purple: "border-purple-500",
  green: "border-green-500",
  yellow: "border-yellow-400",
  indigo: "border-indigo-500",
  emerald: "border-emerald-500",
};

const bgColors = {
  blue: "bg-blue-50",
  purple: "bg-purple-50",
  green: "bg-green-50",
  yellow: "bg-yellow-50",
  indigo: "bg-indigo-50",
  emerald: "bg-emerald-50",
};

const textColors = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
};

const StatCard = ({ title, value, icon, color = "blue", subtitle }) => (
  <div
    className={`bg-white shadow-md rounded-lg p-6 border-l-4 
                ${borderColors[color] ?? borderColors.blue} 
                hover:shadow-lg transition-shadow duration-200`}
  >
    {/* Icon + Title */}
    <div className="flex items-center justify-between mb-3">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <span
        className={`text-2xl p-2 rounded-full 
                    ${bgColors[color] ?? bgColors.blue}`}
      >
        {icon}
      </span>
    </div>

    {/* Value */}
    <p
      className={`text-3xl font-bold 
                  ${textColors[color] ?? textColors.blue}`}
    >
      {value}
    </p>

    {/* Subtitle */}
    {subtitle && (
      <p className="text-gray-400 text-xs mt-2">{subtitle}</p>
    )}
  </div>
);

export default AdminDashboard;