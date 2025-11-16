import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../actions/actionTypes";

const initialState = {
  sectionVisibility: {},
  tabVisibility: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSectionVisibility: (state, action) => {
      state.sectionVisibility = action.payload || {};
    },
    toggleSectionVisibility: (state, action) => {
      const sectionId = action.payload;
      const currentValue = state.sectionVisibility?.[sectionId];
      state.sectionVisibility = {
        ...state.sectionVisibility,
        [sectionId]: !(currentValue ?? true),
      };
    },
    resetSectionVisibility: (state) => {
      state.sectionVisibility = {};
    },
    setTabVisibility: (state, action) => {
      state.tabVisibility = action.payload || {};
    },
    toggleTabVisibility: (state, action) => {
      const tabId = action.payload;
      const currentValue = state.tabVisibility?.[tabId];
      state.tabVisibility = {
        ...state.tabVisibility,
        [tabId]: !(currentValue ?? true),
      };
    },
    resetTabVisibility: (state) => {
      state.tabVisibility = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT, (state) => {
      state.sectionVisibility = {};
      state.tabVisibility = {};
    });
  },
});

export const {
  setSectionVisibility,
  toggleSectionVisibility,
  resetSectionVisibility,
  setTabVisibility,
  toggleTabVisibility,
  resetTabVisibility,
} = uiSlice.actions;

export default uiSlice.reducer;

