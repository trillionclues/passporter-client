import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackApplicationProps {
  loading: boolean;
  error: string | null;
  application: any;
}

const initialState: TrackApplicationProps = {
  loading: false,
  error: null,
  application: null,
};

const trackApplicationSlice = createSlice({
  name: "trackApplication",
  initialState,
  reducers: {
    trackApplicationLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    trackApplicationSuccess(state, action: PayloadAction<any>) {
      state.application = action.payload;
    },
    trackApplicationError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  trackApplicationLoading,
  trackApplicationSuccess,
  trackApplicationError,
} = trackApplicationSlice.actions;
export default trackApplicationSlice.reducer;
