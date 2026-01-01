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
    updateTripParticipantItem: (state, action) => {
      const { tripId, participantId, updates } = action.payload;
      if (state.tripsParticipants && state.tripsParticipants.participants) {
        const participant = state.tripsParticipants.participants.find(
          (p) =>
            p.trip?.id === tripId &&
            (participantId ? p.participant?.id === participantId : true)
        );
        if (participant) {
          if (participant.trip) {
            participant.trip = { ...participant.trip, ...updates };
          } else {
            participant.trip = updates;
          }
        }
      }
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
    updateAccommodationItem: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.accommodation.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.accommodation[index] = {
          ...state.accommodation[index],
          ...updates,
        };
      }
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
  updateAccommodationItem,
  setTripsParticipants,
  updateTripParticipantItem,
  setLoading,
  setError,
} = apiSlice.actions;
export default apiSlice.reducer;
