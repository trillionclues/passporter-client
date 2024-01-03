import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetApplicationProps {
  applications: any;
  loading: boolean;
  error: string;
}

const initialState: GetApplicationProps = {
  applications: [],
  loading: false,
  error: "",
};

const getApplicationsSlice = createSlice({
  name: "getApplications",
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<any>) => {
      state.applications = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setApplication, setLoading, setError } =
  getApplicationsSlice.actions;
export default getApplicationsSlice.reducer;
