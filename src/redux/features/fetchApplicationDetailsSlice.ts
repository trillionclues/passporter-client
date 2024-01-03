import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetApplicationDetailsProps {
  applicationDetails: any;
  loadingDetails: boolean;
  errorDetails: string;
  activeNav: number;
}

const initialState: GetApplicationDetailsProps = {
  applicationDetails: null,
  loadingDetails: false,
  errorDetails: "",
  activeNav: 1,
};

const getApplicationDetailsSlice = createSlice({
  name: "getApplicationDetails",
  initialState,
  reducers: {
    setApplicationDetails: (state, action: PayloadAction<any>) => {
      state.applicationDetails = action.payload;
    },
    setLoadingDetails: (state, action: PayloadAction<boolean>) => {
      state.loadingDetails = action.payload;
    },
    setErrorDetails: (state, action: PayloadAction<string>) => {
      state.errorDetails = action.payload;
    },
    setActiveNav: (state, action: PayloadAction<number>) => {
      state.activeNav = action.payload;
    },
  },
});

export const {
  setApplicationDetails,
  setLoadingDetails,
  setErrorDetails,
  setActiveNav,
} = getApplicationDetailsSlice.actions;
export default getApplicationDetailsSlice.reducer;
