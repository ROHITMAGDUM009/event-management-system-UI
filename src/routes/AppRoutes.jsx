import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Home from "../pages/Home";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

/* ================= LAYOUTS ================= */
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* ================= AUTH ================= */
import ProtectedRoute from "./ProtectedRoute";

/* ================= DASHBOARDS ================= */
import UserDashboard from "../dashboards/UserDashboard";
import OrganizerDashboard from "../dashboards/OrganizerDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";

/* ================= USER PAGES ================= */
import MyBookings from "../pages/user/MyBookings";

/* ================= ORGANIZER PAGES ================= */
import OrganizerMyEvents from "../pages/organizer/OrganizerMyEvents";
import OrganizerBookings from "../pages/organizer/OrganizerBookings";
import CreateEvent from "../pages/organizer/CreateEvent";
import EditEvent from "../pages/organizer/EditEvent";  // ✅ ADDED

/* ================= ADMIN PAGES ================= */
import AdminUsers from "../pages/admin/AdminUsers";
import AdminOrganizers from "../pages/admin/AdminOrganizers";
import AdminEvents from "../pages/admin/AdminEvents";
import AdminPayments from "../pages/admin/AdminPayments";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>

        {/* ================= ORGANIZER ROUTES ================= */}
        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ORGANIZER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OrganizerDashboard />} />
          <Route path="my-events" element={<OrganizerMyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />  {/* ✅ ADDED */}
          <Route path="bookings" element={<OrganizerBookings />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="organizers" element={<AdminOrganizers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;