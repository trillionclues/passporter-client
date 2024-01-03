import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoleUpgradeRequestProps {
  roleUpgradeRequests: any[];
  loading: boolean;
  error: string;
}

const initialState: RoleUpgradeRequestProps = {
  roleUpgradeRequests: [],
  loading: false,
  error: "",
};

const fetchRoleUpgradeRequestsSlice = createSlice({
  name: "fetchRoleUpgradeRequests",
  initialState,
  reducers: {
    fetchRoleUpgradeRequestLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    fetchRoleUpgradeRequestsSuccess: (state, action: PayloadAction<any>) => {
      state.roleUpgradeRequests = action.payload.roleUpgradeRequests;
    },
    fetchRoleUpgradeRequestsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchRoleUpgradeRequestLoading,
  fetchRoleUpgradeRequestsSuccess,
  fetchRoleUpgradeRequestsFailure,
} = fetchRoleUpgradeRequestsSlice.actions;
export default fetchRoleUpgradeRequestsSlice.reducer;
