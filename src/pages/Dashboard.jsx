import { useAuth } from "../context/AuthContext";
import UserDashboard from "../dashboards/UserDashboard";
import OrganizerDashboard from "../dashboards/OrganizerDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (user.role === "ADMIN") return <AdminDashboard />;
  if (user.role === "ORGANIZER") return <OrganizerDashboard />;

  return <UserDashboard />;
};

export default Dashboard;
