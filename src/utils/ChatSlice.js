import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "Chat",
  initialState: {
    liveChat: [],
  },
  reducers: {
    addChats: (state, action) => {
      state.liveChat.push(action.payload);

      const MAX_MESSAGES = 100;

      if (state.liveChat.length > MAX_MESSAGES) {
        state.liveChat.splice(MAX_MESSAGES);
      }
    },
  },
});

export const { addChats } = chatSlice.actions;

export default chatSlice.reducer;
