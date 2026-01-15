import DashboardLayout from "../layouts/DashboardLayout";

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome, User</h1>

      <p className="text-gray-600">View your booked events here.</p>
    </DashboardLayout>
  );
};

export default UserDashboard;
