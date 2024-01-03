import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RoleRequestProps {
  error: string | null;
  roleUpgradeSubmitting: boolean;
  success: boolean;
}

const initialState: RoleRequestProps = {
  error: null,
  roleUpgradeSubmitting: false,
  success: false,
};

const roleRequestSlice = createSlice({
  name: "roleRequest",
  initialState,
  reducers: {
    roleRequestPending: (state) => {
      state.roleUpgradeSubmitting = true;
      state.error = null;
    },
    roleRequestFulfilled: (state, action: PayloadAction<any>) => {
      state.roleUpgradeSubmitting = false;
      state.success = action.payload;
    },
    roleRequestRejected: (state, action: PayloadAction<string>) => {
      state.roleUpgradeSubmitting = false;
      state.error = action.payload as string;
    },
  },
});

export const { roleRequestPending, roleRequestFulfilled, roleRequestRejected } =
  roleRequestSlice.actions;
export default roleRequestSlice.reducer;
