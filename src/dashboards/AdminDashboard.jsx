const AdminDashboard = () => {
  // Temporary stats (later from backend)
  const stats = {
    totalUsers: 125,
    totalOrganizers: 18,
    totalEvents: 42,
    pendingEvents: 6,
    revenue: 154200
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Organizers" value={stats.totalOrganizers} />
        <StatCard title="Total Events" value={stats.totalEvents} />
        <StatCard title="Pending Approvals" value={stats.pendingEvents} />
        <StatCard title="Revenue (₹)" value={stats.revenue} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
