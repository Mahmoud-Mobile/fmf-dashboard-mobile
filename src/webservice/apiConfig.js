import { Get, Post } from "./Gate";

// login apis
const login = async (data) => {
  return await Post("mobile/auth/login", data, "POST", true);
};
// guests apis
const guests = async (data) => {
  return await Get("guests", data);
};

const getGuestById = async (id, data) => {
  return await Get(`guests/${id}`, data);
};

// events apis
const events = async (data = {}) => {
  return await Get("events", data);
};

const getEventById = async (id, data) => {
  return await Get(`events/${id}`, data);
};

// flights apis
const flights = async (eventId, data) => {
  return await Get(`participants/events/${eventId}/flights`, data);
};

// trips apis
const trips = async (eventId, data) => {
  return await Get(`events/${eventId}/transportation/trips`, data);
};

// sub-events apis
const getSubEvents = async (eventId, data) => {
  return await Get(`events/${eventId}/sub-events`, data);
};

const getSubEventById = async (eventId, subEventId, data) => {
  return await Get(`events/${eventId}/sub-events/${subEventId}`, data);
};

// resources apis
const getResources = async (eventId, data) => {
  return await Get(`events/${eventId}/resources`, data);
};

const getResourceById = async (resourceId, data) => {
  return await Get(`events/resources/${resourceId}`, data);
};

// check-in apis
const checkIn = async (eventId, subEventId, data) => {
  return await Post(
    `events/${eventId}/operations/sub-events/${subEventId}/check-in`,
    data,
    "POST",
    true
  );
};

export {
  login,
  guests,
  getGuestById,
  events,
  getEventById,
  flights,
  trips,
  getSubEvents,
  getSubEventById,
  getResources,
  getResourceById,
  checkIn,
};
