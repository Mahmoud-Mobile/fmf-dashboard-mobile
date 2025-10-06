import { profile, guests, getGuestById } from "../../webservice/apiConfig";

import {
  setLoading,
  setError,
  setProfile,
  setGuests,
  setSelectedGuest,
} from "../reducers/apiReducer";

// Fetch profile data
export const fetchProfile = (params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await profile(params);
    dispatch(setProfile(response));
  } catch (error) {
    dispatch(setError("Error fetching profile"));
    console.error("Error fetching profile: ", error);
  }
};

// Fetch all guests
export const fetchGuests = (params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    console.log("Fetching guests with params:", params);
    const response = await guests(params);
    console.log("Guests API response:", response);
    dispatch(setGuests(response));
  } catch (error) {
    dispatch(setError("Error fetching guests"));
    console.error("Error fetching guests: ", error);
  }
};

// Fetch guest by ID
export const fetchGuestById = (id, params) => async (dispatch) => {
  dispatch(setLoading());
  try {
    console.log("Fetching guest by ID:", id, "with params:", params);
    const response = await getGuestById(id, params);
    console.log("Guest details API response:", response);
    dispatch(setSelectedGuest(response));
  } catch (error) {
    dispatch(setError("Error fetching guest details"));
    console.error("Error fetching guest details: ", error);
  }
};
