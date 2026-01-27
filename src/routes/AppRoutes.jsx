import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PUBLIC */
import Home from "../pages/Home";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

/* LAYOUTS */
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* AUTH */
import ProtectedRoute from "./ProtectedRoute";

/* DASHBOARDS */
import Dashboard from "../pages/Dashboard";

/* USER PAGES */
import MyBookings from "../pages/MyBookings";

/* ORGANIZER PAGES */
import OrganizerMyEvents from "../pages/OrganizerMyEvents";
import OrganizerBookings from "../pages/OrganizerBookings";
import CreateEvent from "../pages/CreateEvent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= USER AREA ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="payments" element={<MyBookings />} />
        </Route>

        {/* ================= ORGANIZER AREA ================= */}
        <Route
          path="/organizer"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OrganizerDashboard />} />
          <Route path="my-events" element={<OrganizerMyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="bookings" element={<OrganizerBookings />} />
        </Route>


        {/* ================= ADMIN AREA ================= */}


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
