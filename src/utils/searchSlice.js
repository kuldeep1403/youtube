import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      const { key, data } = action.payload;
      state[key] = data;
    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;
