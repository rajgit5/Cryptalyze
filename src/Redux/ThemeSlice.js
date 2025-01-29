import { createSlice } from "@reduxjs/toolkit";

let checkTheme = localStorage.getItem("localTheme");

const initialState = {
  colorMode: checkTheme ? checkTheme : "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
      localStorage.setItem("localTheme", state.colorMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
