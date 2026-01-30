import api from "./axios";

// Book an event
export const bookEvent = (eventId) =>
  api.post("/api/bookings", { eventId });

// Fetch logged-in user's bookings
export const fetchMyBookings = () =>
  api.get("/api/bookings/my");

// Pay for a booking
export const payForBooking = (bookingId) =>
  api.post(`/api/payments/pay/${bookingId}`);
