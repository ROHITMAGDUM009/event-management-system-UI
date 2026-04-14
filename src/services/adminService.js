import API from "./api";

export const getAllEvents = () => API.get("/admin/events");
export const getAllUsers = () => API.get("/admin/users");
export const getAllBookings = () => API.get("/admin/bookings");