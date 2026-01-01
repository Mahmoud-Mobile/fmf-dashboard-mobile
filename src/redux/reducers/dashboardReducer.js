import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: null,
    loading: false,
    error: null,
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
  },
});

export const {
  setDashboardSummary,
  setDashboardLoading,
  setDashboardError,
  clearDashboardSummary,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;

