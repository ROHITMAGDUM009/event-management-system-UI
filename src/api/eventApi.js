import api from "./axios";

// PUBLIC — get approved events
export const getApprovedEvents = () =>
  api.get("/events/approved");

// ORGANIZER — get my events
export const getMyEvents = () =>
  api.get("/events/my");

// ORGANIZER — create event
export const createEvent = (data) =>
  api.post("/events", data);

// ORGANIZER — update event
export const updateEvent = (id, data) =>
  api.put(`/events/${id}`, data);

// ADMIN — get all events
export const getAllEvents = () =>
  api.get("/events");

// ADMIN — delete event
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);