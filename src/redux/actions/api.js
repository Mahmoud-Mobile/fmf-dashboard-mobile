import {
  profile,
  events,
  getEventById,
  flights,
  trips,
} from "../../webservice/apiConfig";

import {
  setLoading,
  setError,
  setProfile,
  setEvents,
  setSelectedEvent,
  setFlights,
  setTrips,
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

export { setSelectedEvent };
