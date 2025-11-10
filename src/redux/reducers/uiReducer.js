import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionVisibility: {},
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
  },
});

export const {
  setSectionVisibility,
  toggleSectionVisibility,
  resetSectionVisibility,
} = uiSlice.actions;

export default uiSlice.reducer;

