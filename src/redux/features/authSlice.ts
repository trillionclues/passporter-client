import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isLoading: boolean;
  error: any | { message: string; statusCode?: number };
  token: string | null;
  user: { [key: string]: any } | null;
  sessionData: any;
}

const initialToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState: AuthState = {
  user: null,
  token: initialToken,
  isLoading: false,
  error: null,
  sessionData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: { [key: string]: any };
        token: string;
        sessionData: any;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.sessionData = action.payload.sessionData;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.error = { message: action.payload };
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.sessionData = null;
      Cookies.remove("token");
      Cookies.remove("sessionData");
    },
  },
});

export const { setUser, logout, setLoginError, setLoading, clearLoginError } =
  authSlice.actions;
export default authSlice.reducer;
