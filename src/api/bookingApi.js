import api from "./axios";

// USER — book an event
export const bookEvent = (eventId) =>
  api.post("/bookings", { eventId });

// USER — get my bookings
export const getMyBookings = () =>
  api.get("/bookings/my");

// ORGANIZER — get bookings for my events
export const getOrganizerBookings = () =>
  api.get("/organizer/bookings");

// ORGANIZER — approve a booking
export const approveBooking = (id) =>
  api.post(`/organizer/bookings/${id}/approve`);

// PAYMENT — pay for a booking
export const payForBooking = (bookingId) =>
  api.post(`/payments/pay/${bookingId}`);