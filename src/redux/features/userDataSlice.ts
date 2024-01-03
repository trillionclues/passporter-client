import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserProps {
  userData: any;
  loading: boolean;
  error: string;
}

const initialState: UserProps = {
  userData: null,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserDetails, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
