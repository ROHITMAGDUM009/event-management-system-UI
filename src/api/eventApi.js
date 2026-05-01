import api from "./axios";

// PUBLIC — get approved events
export const getApprovedEvents = () =>
  api.get("/events/approved");

// ORGANIZER — get my events
export const getMyEvents = () =>
  api.get("/events/my");

// ✅ FIXED — CREATE EVENT (accept FormData directly)
export const createEvent = (formData) =>
  api.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ORGANIZER — update event (JSON only for now)
export const updateEvent = (id, data) =>
  api.put(`/events/${id}`, data);

// ADMIN — get all events
export const getAllEvents = () =>
  api.get("/events");

// ADMIN — delete event
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);