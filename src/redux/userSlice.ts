"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
};

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//   },
// });

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
// export const { setUserId } = userSlice.actions;
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
