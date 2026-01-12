import { Get, Post, GetBinary } from "./Gate";
import { Platform } from "react-native";

// login apis
const login = async (data, showAlert = true, additionalHeaders = null) => {
  const platform = Platform.OS === "ios" ? "IOS" : "Android";
  return await Post(
    "mobile/ops/auth/login",
    data,
    "POST",
    true,
    showAlert,
    platform,
    additionalHeaders
  );
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
const flights = async (eventId, data, participantId = null) => {
  if (participantId) {
    return await Get(
      `mobile/ops/events/${eventId}/participants/${participantId}/flights`,
      data
    );
  } else {
    return await Get(`mobile/ops/events/${eventId}/flights`, data);
  }
};

// Get vehicles
const getVehicles = async (eventId, data = {}) => {
  return await Get(`mobile/ops/events/${eventId}/transport/vehicles`, data);
};

// Create trip
const createTrip = async (eventId, participantId, data) => {
  if (participantId) {
    return await Post(
      `mobile/ops/events/${eventId}/participants/${participantId}/transportation/trips`,
      data,
      "POST",
      true
    );
  }
};

// Get trips participants
const getTripsParticipants = async (eventId, data, participantId = null) => {
  if (participantId) {
    return await Get(
      `mobile/ops/events/${eventId}/participants/${participantId}/transportation/trips`,
      data
    );
  } else {
    return await Get(
      `mobile/ops/events/${eventId}/transport/participants`,
      data
    );
  }
};

// Get designated cars
const getDesignatedCars = async (eventId, data) => {
  return await Get(
    `mobile/ops/events/${eventId}/transport/trips/designated`,
    data
  );
};

// Mark trip participant as no-show
const markTripParticipantNoShow = async (
  eventId,
  tripId,
  participantId,
  data
) => {
  return await Post(
    `mobile/ops/events/${eventId}/transport/trips/${tripId}/participant/${participantId}/mark-no-show`,
    data,
    "POST",
    true
  );
};

// Mark trip participant as picked up
const markTripParticipantPickedUp = async (
  eventId,
  tripId,
  participantId,
  data
) => {
  return await Post(
    `mobile/ops/events/${eventId}/transport/trips/${tripId}/participant/${participantId}/mark-picked-up`,
    data,
    "POST",
    true
  );
};

// Mark trip as complete
const markTripComplete = async (eventId, tripId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/transport/trips/${tripId}/mark-complete`,
    data,
    "POST",
    true
  );
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
    `mobile/ops/events/${eventId}/sub-events/${subEventId}/check-in`,
    data,
    "POST",
    true
  );
};

const resource_Checkin = async (eventId, resourceId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/resources/${resourceId}/check-in`,
    data,
    "POST",
    true
  );
};
const subEvent_Checkout = async (eventId, subEventId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/sub-events/${subEventId}/check-out`,
    data,
    "POST",
    true
  );
};

const resource_Checkout = async (eventId, resourceId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/resources/${resourceId}/check-out`,
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

// Mark flight arrived
const markFlightArrived = async (flightId, participantId, data) => {
  return await Post(
    `mobile/ops/flights/${flightId}/participant/${participantId}/mark-arrived`,
    data,
    "POST",
    true
  );
};

// Mark flight departed
const markFlightDeparted = async (flightId, participantId, data) => {
  return await Post(
    `mobile/ops/flights/${flightId}/participant/${participantId}/mark-departed`,
    data,
    "POST",
    true
  );
};

// Toggle meet done
const toggleMeetDone = async (flightId, participantId, data) => {
  return await Post(
    `mobile/ops/flights/${flightId}/participant/${participantId}/toggle-meet-done`,
    data,
    "POST",
    true
  );
};

// Toggle luggage received
const toggleLuggageReceived = async (flightId, participantId, data) => {
  return await Post(
    `mobile/ops/flights/${flightId}/participant/${participantId}/toggle-luggage-received`,
    data,
    "POST",
    true
  );
};

// accommodation apis
const getAccommodationParticipants = async (eventId, data) => {
  return await Get(
    `mobile/ops/events/${eventId}/accommodation/participants`,
    data
  );
};

// Get participant by ID
const getParticipantById = async (eventId, participantId, data = {}) => {
  return await Get(
    `mobile/ops/events/${eventId}/participants/${participantId}`,
    data
  );
};

// Mark accommodation checked in
const markAccommodationCheckedIn = async (eventId, accommodationId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/accommodation/${accommodationId}/mark-checked-in`,
    data,
    "POST",
    true
  );
};

// Mark accommodation checked out
const markAccommodationCheckedOut = async (eventId, accommodationId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/accommodation/${accommodationId}/mark-checked-out`,
    data,
    "POST",
    true
  );
};
// offer home visit apis
// Mark vendor check in
const visitVendorCheckIn = async (eventId, exhibitorId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/exhibitors/${exhibitorId}/scan`,
    data,
    "POST",
    true
  );
};
const createPurchase = async (eventId, exhibitorId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/exhibitors/${exhibitorId}/purchase`,
    data,
    "POST",
    true
  );
};

// Get all exhibitors for an event
const getExhibitors = async (eventId, data = {}) => {
  return await Get(`mobile/ops/events/${eventId}/exhibitors`, data);
};

// Get exhibitor by ID
const getExhibitorById = async (eventId, exhibitorId, data = {}) => {
  return await Get(
    `mobile/ops/events/${eventId}/exhibitors/${exhibitorId}`,
    data
  );
};

// Get exhibitor dashboard
const getExhibitorDashboard = async (eventId, exhibitorId, data = {}) => {
  return await Get(
    `mobile/ops/events/${eventId}/exhibitors/${exhibitorId}/dashboard`,
    data
  );
};

const verifyCheckin_Area = async (eventId, resourceId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/resources/${resourceId}/verify`,
    data,
    "POST",
    true
  );
};

const checkin_Area = async (eventId, resourceId, data) => {
  return await Post(
    `mobile/ops/events/${eventId}/resources/${resourceId}/check-in`,
    data,
    "POST",
    true
  );
};

// Import purchases from Excel/CSV file
const importPurchases = async (eventId, exhibitorId, file) => {
  // File should be in format: { uri: string, name: string, type: string }
  return await Post(
    `mobile/ops/events/${eventId}/exhibitors/${exhibitorId}/purchases/import`,
    { file },
    "POST",
    false // multipart/form-data
  );
};

// Download purchases template
const downloadPurchasesTemplate = async (eventId) => {
  return await GetBinary(
    `mobile/ops/events/${eventId}/exhibitors/template/purchases`,
    {},
    false
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
  getVehicles,
  createTrip,
  getTripsParticipants,
  getDesignatedCars,
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
  verifyCheckin_Area,
  checkin_Area,
  markFlightArrived,
  markFlightDeparted,
  toggleMeetDone,
  toggleLuggageReceived,
  getAccommodationParticipants,
  markAccommodationCheckedIn,
  markAccommodationCheckedOut,
  markTripParticipantNoShow,
  markTripParticipantPickedUp,
  markTripComplete,
  getParticipantById,
  visitVendorCheckIn,
  createPurchase,
  getExhibitors,
  getExhibitorById,
  getExhibitorDashboard,
  importPurchases,
  downloadPurchasesTemplate,
};
