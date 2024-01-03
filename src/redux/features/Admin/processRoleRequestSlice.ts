import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProcessRoleRequestState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProcessRoleRequestState = {
  loading: false,
  error: null,
  success: false,
};

const processApplicantRoleRequestSlice = createSlice({
  name: "processApplicantRoleRequest",
  initialState,
  reducers: {
    setRoleUpgradeLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRoleUpgradeSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
      state.loading = false;
    },
    setRoleUpgradeError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setRoleUpgradeLoading,
  setRoleUpgradeSuccess,
  setRoleUpgradeError,
} = processApplicantRoleRequestSlice.actions;
export default processApplicantRoleRequestSlice.reducer;
