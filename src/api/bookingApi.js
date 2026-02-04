import api from "./axios";

export const bookEvent = (eventId) =>
  api.post("/bookings", { eventId });

export const fetchMyBookings = () =>
  api.get("/user/bookings");

export const fetchOrganizerBookings = () =>
  api.get("/organizer/bookings");

export const approveBooking = (bookingId) =>
  api.put(`/organizer/bookings/${bookingId}/approve`);
