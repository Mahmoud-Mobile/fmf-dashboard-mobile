import { createSlice } from "@reduxjs/toolkit";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [],
    selectedMeeting: null,
  },
  reducers: {
    addMeeting: (state, action) => {
      const newMeeting = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.meetings.push(newMeeting);
      // Sort meetings by date and time
      state.meetings.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
    },
    updateMeeting: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.meetings.findIndex((meeting) => meeting.id === id);
      if (index !== -1) {
        state.meetings[index] = { ...state.meetings[index], ...updates };
        // Re-sort after update
        state.meetings.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB;
        });
      }
    },
    deleteMeeting: (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload
      );
    },
    setSelectedMeeting: (state, action) => {
      state.selectedMeeting = action.payload;
    },
    clearSelectedMeeting: (state) => {
      state.selectedMeeting = null;
    },
  },
});

export const {
  addMeeting,
  updateMeeting,
  deleteMeeting,
  setSelectedMeeting,
  clearSelectedMeeting,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;