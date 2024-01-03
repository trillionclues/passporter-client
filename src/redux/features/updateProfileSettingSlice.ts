import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface updateProfileProps {
  data: any;
  error: string | null;
  submitting: boolean;
}

const initialState: updateProfileProps = {
  data: null,
  error: null,
  submitting: false,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateProfilePending: (state) => {
      state.submitting = true;
      state.error = null;
    },
    updateProfileFulfilled: (state, action: PayloadAction<any>) => {
      state.submitting = false;
      state.data = action.payload;
    },
    updateProfileRejected: (state, action: PayloadAction<string>) => {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfilePending,
  updateProfileFulfilled,
  updateProfileRejected,
} = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
