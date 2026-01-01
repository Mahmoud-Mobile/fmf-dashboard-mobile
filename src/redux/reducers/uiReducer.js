import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../actions/actionTypes";

const initialState = {
  sectionVisibility: {},
  tabVisibility: {},
  actionButtonVisibility: {}, // Store action button visibility: { "buttonText": true/false }
  disabledIcons: {}, // Store disabled icon states: { "iconName-flightId": true }
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
    setActionButtonVisibility: (state, action) => {
      state.actionButtonVisibility = action.payload || {};
    },
    toggleActionButtonVisibility: (state, action) => {
      const buttonText = action.payload;
      const currentValue = state.actionButtonVisibility?.[buttonText];
      state.actionButtonVisibility = {
        ...state.actionButtonVisibility,
        [buttonText]: !(currentValue ?? true),
      };
    },
    resetActionButtonVisibility: (state) => {
      state.actionButtonVisibility = {};
    },
    resetAllVisibilitySettings: (state) => {
      state.sectionVisibility = {};
      state.tabVisibility = {};
      state.actionButtonVisibility = {};
    },
    setIconDisabled: (state, action) => {
      const { iconId, disabled } = action.payload;
      // Ensure disabledIcons is initialized
      if (!state.disabledIcons) {
        state.disabledIcons = {};
      }
      if (disabled) {
        state.disabledIcons[iconId] = true;
      } else {
        delete state.disabledIcons[iconId];
      }
    },
    toggleIconDisabled: (state, action) => {
      const iconId = action.payload;
      // Ensure disabledIcons is initialized
      if (!state.disabledIcons) {
        state.disabledIcons = {};
      }
      if (state.disabledIcons[iconId]) {
        delete state.disabledIcons[iconId];
      } else {
        state.disabledIcons[iconId] = true;
      }
    },
    resetDisabledIcons: (state) => {
      state.disabledIcons = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT, (state) => {
      // Keep visibility settings on logout - only reset disabledIcons
      state.disabledIcons = {};
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
  setActionButtonVisibility,
  toggleActionButtonVisibility,
  resetActionButtonVisibility,
  resetAllVisibilitySettings,
  setIconDisabled,
  toggleIconDisabled,
  resetDisabledIcons,
} = uiSlice.actions;

export default uiSlice.reducer;
