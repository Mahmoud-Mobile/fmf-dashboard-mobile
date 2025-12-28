import { Get, Post } from "./Gate";

// login apis
const login = async (data) => {
  return await Post("mobile/auth/login", data, "POST", true);
};

// profile apis
const profile = async (data) => {
  return await Get("users/me/profile", data);
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
const subEvent_Checkin = async (eventId, subEventId, data) => {
  return await Post(
    `events/${eventId}/operations/sub-events/${subEventId}/check-in`,
    data,
    "POST",
    true
  );
};

const resource_Checkin = async (eventId, resourceId, data) => {
  return await Post(
    `events/${eventId}/operations/resources/${resourceId}/check-in`,
    data,
    "POST",
    true
  );
};

const subEvent_Checkout = async (eventId, subEventId, data) => {
  return await Post(
    `events/${eventId}/operations/sub-events/${subEventId}/check-out`,
    data,
    "POST",
    true
  );
};

const resource_Checkout = async (eventId, resourceId, data) => {
  return await Post(
    `events/${eventId}/operations/resources/${resourceId}/check-out`,
    data,
    "POST",
    true
  );
};
// manual register api
const subEvent_ManualRegister = async (eventId, subEventId, data) => {
  return await Post(
    `events/${eventId}/operations/sub-events/${subEventId}/manual-register`,
    data,
    "POST",
    true
  );
};

// seating plans apis
const getSeatingPlans = async (eventId, subeventId, data) => {
  return await Get(
    `events/${eventId}/subevent/${subeventId}/seating/plans`,
    data
  );
};

const checkin_OfferHome = async (eventId, vendorId, data) => {
  return await Post(
    `events/${eventId}/operations/resources/${vendorId}/check-in`,
    data,
    "POST",
    true
  );
};

// flights arrived api
const flightArrived = async (participantId, data) => {
  return await Post(
    `participants/${participantId}/flights/arrived`,
    data,
    "POST",
    true
  );
};

// flights departed api
const flightDeparted = async (participantId, data) => {
  return await Post(
    `participants/${participantId}/flights/departed`,
    data,
    "POST",
    true
  );
};

export {
  login,
  profile,
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
  subEvent_Checkin,
  resource_Checkin,
  subEvent_Checkout,
  resource_Checkout,
  subEvent_ManualRegister,
  getSeatingPlans,
  checkin_OfferHome,
  flightArrived,
  flightDeparted,
};
