import api from "./axios";

export const bookEvent = (eventId) =>
  api.post("/api/bookings", { eventId });

export const myBookings = () =>
  api.get("/api/bookings/my");

export const payForBooking = (bookingId) =>
  api.post(`/api/payments/pay/${bookingId}`);
