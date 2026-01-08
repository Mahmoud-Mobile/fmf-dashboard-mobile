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
    tripsParticipants: null,
    subEvents: [],
    selectedSubEvent: {},
    resources: [],
    selectedResource: {},
    seatingPlans: null,
    accommodation: [],
    selectedParticipant: {},
    exhibitors: [],
    exhibitor: null,
    exhibitorDashboard: null,
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
    setTripsParticipants: (state, action) => {
      state.tripsParticipants = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSubEvents: (state, action) => {
      state.subEvents = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedSubEvent: (state, action) => {
      state.selectedSubEvent = action.payload;
      state.loading = false;
      state.error = null;
    },
    setResources: (state, action) => {
      state.resources = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedResource: (state, action) => {
      state.selectedResource = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSeatingPlans: (state, action) => {
      state.seatingPlans = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAccommodation: (state, action) => {
      state.accommodation = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedParticipant: (state, action) => {
      state.selectedParticipant = action.payload;
      state.loading = false;
      state.error = null;
    },
    setExhibitors: (state, action) => {
      state.exhibitors = action.payload?.exhibitors || action.payload || [];
      state.loading = false;
      state.error = null;
    },
    setExhibitor: (state, action) => {
      state.exhibitor = action.payload;
      state.loading = false;
      state.error = null;
    },
    setExhibitorDashboard: (state, action) => {
      state.exhibitorDashboard = action.payload;
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
  setExhibitorDashboard,
  setLoading,
  setError,
} = apiSlice.actions;
export default apiSlice.reducer;
