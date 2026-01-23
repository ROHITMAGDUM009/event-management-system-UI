import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

import UserDashboard from "../dashboards/UserDashboard";
import OrganizerDashboard from "../dashboards/OrganizerDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "ROLE_ADMIN":
        return <AdminDashboard />;

      case "ROLE_ORGANIZER":
        return <OrganizerDashboard />;

      case "ROLE_USER":
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
