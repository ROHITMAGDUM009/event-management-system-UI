// src/api/bookingApi.js

import api from "./axios";

export const bookEvent = (data) =>
    api.post("/bookings", data);

export const getMyBookings = () =>
    api.get("/bookings/my");

export const cancelBooking = (bookingId, reason) =>
    api.post(`/bookings/${bookingId}/cancel`, { reason });

export const payForBooking = (bookingId) =>
    api.post(`/payments/pay/${bookingId}`);

// ✅ THIS MUST EXIST:
export const getOrganizerBookings = () =>
    api.get("/organizer/bookings/my");

export const approveBooking = (bookingId) =>
    api.post(`/organizer/bookings/${bookingId}/approve`);

export const rejectBooking = (bookingId) =>
    api.post(`/organizer/bookings/${bookingId}/reject`);