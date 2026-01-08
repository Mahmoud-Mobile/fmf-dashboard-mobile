import {
  profile,
  events,
  getEventById,
  flights,
  trips,
  getTripsParticipants,
  getSubEvents,
  getSubEventById,
  getResources,
  getResourceById,
  getSeatingPlans,
  getAccommodationParticipants,
  getParticipantById,
  getExhibitors,
  getExhibitorById,
} from "../../webservice/apiConfig";

import {
  setLoading,
  setError,
  setProfile,
  setEvents,
  setSelectedEvent,
  setFlights,
  setTrips,
  setSubEvents,
  setSelectedSubEvent,
  setResources,
  setSelectedResource,
  setSeatingPlans,
  setAccommodation,
  setTripsParticipants,
  setSelectedParticipant,
  setExhibitors,
  setExhibitor,
} from "../reducers/apiReducer";

// Fetch profile data
export const fetchProfile = (params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await profile(params);
    dispatch(setProfile(response));
  } catch (error) {
    dispatch(setError("Error fetching profile"));
  }
};

// Fetch all events
export const fetchEvents =
  (params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await events(params);
      dispatch(setEvents(response));
    } catch (error) {
      dispatch(setError("Error fetching events"));
    }
  };

// Fetch event by ID
export const fetchEventById =
  (id, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log("Fetching event by ID:", id);
      const response = await getEventById(id, params);
      dispatch(setSelectedEvent(response));
    } catch (error) {
      dispatch(setError("Error fetching event details"));
    }
  };

// Fetch flights for an event
export const fetchFlights = (eventId, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await flights(eventId, params);
    dispatch(setFlights(response));
  } catch (error) {
    dispatch(setError("Error fetching flights"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch trips for an event
export const fetchTrips = (eventId, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await trips(eventId, params);
    dispatch(setTrips(response));
  } catch (error) {
    console.log("Error in fetchTrips:", error);
    dispatch(setError("Error fetching trips"));
  }
};

// Fetch trips participants for an event
export const fetchTripsParticipants = (eventId, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getTripsParticipants(eventId, params);
    if (response) {
      dispatch(setTripsParticipants(response));
    }
  } catch (error) {
    dispatch(setError("Error fetching trips participants"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch sub-events for an event
export const fetchSubEvents = (eventId, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getSubEvents(eventId, params);
    dispatch(setSubEvents(response));
  } catch (error) {
    console.log("Error in fetchSubEvents:", error);
    dispatch(setError("Error fetching sub-events"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch sub-event by ID
export const fetchSubEventById =
  (eventId, subEventId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log("Fetching sub-event by ID:", subEventId);
      const response = await getSubEventById(eventId, subEventId, params);
      dispatch(setSelectedSubEvent(response));
    } catch (error) {
      dispatch(setError("Error fetching sub-event details"));
      console.log("Error fetching sub-event details: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch resources for an event
export const fetchResources = (eventId, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getResources(eventId, params);
    dispatch(setResources(response));
  } catch (error) {
    console.log("Error in fetchResources:", error);
    dispatch(setError("Error fetching resources"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch resource by ID
export const fetchResourceById =
  (resourceId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log("Fetching resource by ID:", resourceId);
      const response = await getResourceById(resourceId, params);
      dispatch(setSelectedResource(response));
    } catch (error) {
      dispatch(setError("Error fetching resource details"));
      console.log("Error fetching resource details: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch seating plans for a sub-event
export const fetchSeatingPlans =
  (eventId, subeventId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await getSeatingPlans(eventId, subeventId, params);
      dispatch(setSeatingPlans(response));
    } catch (error) {
      dispatch(setError("Error fetching seating plans"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch accommodation participants for an event
export const fetchAccommodationParticipants =
  (eventId, params) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await getAccommodationParticipants(eventId, params);
      if (response) {
        dispatch(setAccommodation(response));
      }
    } catch (error) {
      dispatch(setError("Error fetching accommodation participants"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch participant by ID
export const fetchParticipantById =
  (eventId, participantId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await getParticipantById(eventId, participantId, params);
      dispatch(setSelectedParticipant(response));
    } catch (error) {
      dispatch(setError("Error fetching participant details"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch all exhibitors for an event
export const fetchExhibitors =
  (eventId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await getExhibitors(eventId, params);
      dispatch(setExhibitors(response));
      return response;
    } catch (error) {
      dispatch(setError("Error fetching exhibitors"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch exhibitor by ID
export const fetchExhibitorById =
  (eventId, exhibitorId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await getExhibitorById(eventId, exhibitorId, {
        includeProducts: true,
        includeVisits: true,
        includePurchases: true,
        ...params,
      });
      dispatch(setExhibitor(response));
      return response;
    } catch (error) {
      dispatch(setError("Error fetching exhibitor details"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export { setSelectedEvent };
