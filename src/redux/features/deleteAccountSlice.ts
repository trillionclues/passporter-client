import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DeleteAccountProps {
  error: string | null;
 loading: boolean;
  success: boolean;
}

const initialState: DeleteAccountProps = {
  error: null,
  success: false,
  loading: false,
};

const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState,
  reducers: {
    deleteRequestPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRequestFulfilled: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = action.payload;
    },
    deleteRequestRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload as string;
    },
  },
});

export const { deleteRequestPending, deleteRequestFulfilled, deleteRequestRejected } =
deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
