import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import MyBookings from "../pages/MyBookings";
import ProtectedRoute from "./ProtectedRoute";

import MyEvents from "../pages/MyEvents";

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

        {/* ================= DASHBOARD ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard page */}
          <Route index element={<Dashboard />} />

          {/* User pages */}
          <Route path="bookings" element={<MyBookings />} />

          {/* ORGANIZER */}
          <Route path="my-events" element={<MyEvents />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
