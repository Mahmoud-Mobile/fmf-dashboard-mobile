import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    profile: {},
    news: [],
    showNews: {},
    books: [],
    showBooks: {},
    recommendations: [],
    showRecommendations: {},
    guests: [],
    selectedGuest: {},
    events: [],
    selectedEvent: {},
    flights: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNews: (state, action) => {
      state.news = action.payload;
      state.loading = false;
      state.error = null;
    },
    setShowNews: (state, action) => {
      state.showNews = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    },
    setShowBooks: (state, action) => {
      state.showBooks = action.payload;
      state.loading = false;
      state.error = null;
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setShowRecommendations: (state, action) => {
      state.showRecommendations = action.payload;
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
      // Handle API response with events array
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
      // Store the full response object (with flights array and total)
      state.flights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProfile,
  setCategories,
  setCartItems,
  setNews,
  setShowNews,
  setRecommendations,
  setShowRecommendations,
  setBooks,
  setShowBooks,
  setGuests,
  setSelectedGuest,
  setEvents,
  setSelectedEvent,
  setFlights,
  setLoading,
  setError,
} = apiSlice.actions;
export default apiSlice.reducer;
