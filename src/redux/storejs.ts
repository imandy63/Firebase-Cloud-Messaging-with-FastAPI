"use client";
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./userSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export default store;
