import api from "./axios";

// Dashboard stats
export const getDashboardStats = () =>
  api.get("/admin/dashboard-stats");

// User management
export const getAllUsers = () =>
  api.get("/admin/users");

export const changeUserStatus = (id, enabled) =>
  api.put(`/admin/users/${id}/status`, { enabled });

export const makeOrganizer = (id) =>
  api.put(`/admin/users/${id}/make-organizer`);

export const removeOrganizer = (id) =>
  api.put(`/admin/users/${id}/remove-organizer`);

export const deleteUser = (id) =>
  api.delete(`/admin/users/${id}`);

// Event approvals
export const getAllEventsAdmin = () =>
  api.get("/admin/events");

export const approveEvent = (id) =>
  api.put(`/admin/events/${id}/approve`);

export const rejectEvent = (id) =>
  api.put(`/admin/events/${id}/reject`);