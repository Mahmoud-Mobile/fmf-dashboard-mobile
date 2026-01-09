import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: null,
    loading: false,
    error: null,
    topCountries: [],
    topCountriesLoading: false,
    topCountriesError: null,
    eventSummaryKPIs: null,
    eventSummaryKPIsLoading: false,
    eventSummaryKPIsError: null,
  },
  reducers: {
    setDashboardSummary: (state, action) => {
      state.summary = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDashboardLoading: (state, action) => {
      state.loading = action.payload !== undefined ? action.payload : true;
    },
    setDashboardError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearDashboardSummary: (state) => {
      state.summary = null;
      state.error = null;
    },
    setTopCountries: (state, action) => {
      state.topCountries = action.payload;
      state.topCountriesLoading = false;
      state.topCountriesError = null;
    },
    setTopCountriesLoading: (state, action) => {
      state.topCountriesLoading = action.payload !== undefined ? action.payload : true;
    },
    setTopCountriesError: (state, action) => {
      state.topCountriesError = action.payload;
      state.topCountriesLoading = false;
    },
    clearTopCountries: (state) => {
      state.topCountries = [];
      state.topCountriesError = null;
    },
    setEventSummaryKPIs: (state, action) => {
      state.eventSummaryKPIs = action.payload;
      state.eventSummaryKPIsLoading = false;
      state.eventSummaryKPIsError = null;
    },
    setEventSummaryKPIsLoading: (state, action) => {
      state.eventSummaryKPIsLoading = action.payload !== undefined ? action.payload : true;
    },
    setEventSummaryKPIsError: (state, action) => {
      state.eventSummaryKPIsError = action.payload;
      state.eventSummaryKPIsLoading = false;
    },
    clearEventSummaryKPIs: (state) => {
      state.eventSummaryKPIs = null;
      state.eventSummaryKPIsError = null;
    },
  },
});

export const {
  setDashboardSummary,
  setDashboardLoading,
  setDashboardError,
  clearDashboardSummary,
  setTopCountries,
  setTopCountriesLoading,
  setTopCountriesError,
  clearTopCountries,
  setEventSummaryKPIs,
  setEventSummaryKPIsLoading,
  setEventSummaryKPIsError,
  clearEventSummaryKPIs,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;

