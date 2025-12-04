import {
  profile,
  events,
  getEventById,
  flights,
  trips,
  getSubEvents,
  getSubEventById,
  getResources,
  getResourceById,
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
} from "../reducers/apiReducer";

// Fetch profile data
export const fetchProfile = (params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await profile(params);
    dispatch(setProfile(response));
  } catch (error) {
    dispatch(setError("Error fetching profile"));
    console.log("Error fetching profile: ", error);
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
      console.log("Error fetching events: ", error);
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
      console.log("Error fetching event details: ", error);
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
  (subEventId, params = {}) =>
  async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log("Fetching sub-event by ID:", subEventId);
      const response = await getSubEventById(subEventId, params);
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

export { setSelectedEvent };
