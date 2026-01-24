import { useAuth } from "../context/AuthContext";
import UserDashboard from "../dashboards/UserDashboard";
import OrganizerDashboard from "../dashboards/OrganizerDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case "ROLE_ADMIN":
      return <AdminDashboard />;
    case "ROLE_ORGANIZER":
      return <OrganizerDashboard />;
    default:
      return <UserDashboard />;
  }
};


export default Dashboard;
