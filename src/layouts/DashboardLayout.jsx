import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserSidebar from "../components/UserSidebar";
import OrganizerSidebar from "../components/OrganizerSidebar";
import AdminSidebar from "../components/AdminSidebar";

const DashboardLayout = () => {
  const { user } = useAuth();

  const renderSidebar = () => {
    if (!user) return null;

    switch (user.role) {
      case "ROLE_ADMIN":
        return <AdminSidebar />;
      case "ROLE_ORGANIZER":
        return <OrganizerSidebar />;
      default:
        return <UserSidebar />;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {renderSidebar()}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
