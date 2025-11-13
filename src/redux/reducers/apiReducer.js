import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    profile: {},
    guests: [],
    selectedGuest: {},
    events: [],
    selectedEvent: {},
    flights: [],
    trips: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedGuest: (state, action) => {
      state.selectedGuest = action.payload;
      state.loading = false;
      state.error = null;
    },
    setEvents: (state, action) => {
      state.events = action.payload?.events || action.payload || [];
      state.loading = false;
      state.error = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFlights: (state, action) => {
      state.flights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTrips: (state, action) => {
      state.trips = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload !== undefined ? action.payload : true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProfile,
  setGuests,
  setSelectedGuest,
  setEvents,
  setSelectedEvent,
  setFlights,
  setTrips,
  setLoading,
  setError,
} = apiSlice.actions;
export default apiSlice.reducer;
