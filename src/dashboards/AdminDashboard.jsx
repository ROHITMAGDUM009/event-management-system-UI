import DashboardLayout from "../layouts/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">AdminControl Panel</h1>

      <p className="text-gray-600">
        Manage users, events, and platform settings.
      </p>
    </DashboardLayout>
  );
};

export default AdminDashboard;
