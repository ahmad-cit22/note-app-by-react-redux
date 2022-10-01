import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const changeSlice = createSlice({
  name: "changeDetector",
  initialState: {
    value: true,
  },
  reducers: {
    changeState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeState } = changeSlice.actions;

export default changeSlice.reducer;



