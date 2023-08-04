import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userEmail: "",
  token: "",
  user: {},
  passwords: [],
  errorMessage: {},
  successMessage: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    userAuth: (state, action) => {
      state.user = { ...action.payload };
    },
    setEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    passwordListing: (state, action) => {
      state.passwords = [...action.payload];
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = { ...action.payload };
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = { ...action.payload };
    },
  },
});

  export const { setMode, setToken, setEmail, userAuth, passwordListing, setErrorMessage, setSuccessMessage } = authSlice.actions;

export default authSlice.reducer;
