import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface QueueApplicationProps {
  queueList: any[];
  loading: boolean;
  error: string;
}

const initialState: QueueApplicationProps = {
  queueList: [],
  loading: false,
  error: "",
};

const getQueueApplicationsSlice = createSlice({
  name: "getQueueApplicationsSlice",
  initialState,
  reducers: {
    setApplicationQueue: (state, action: PayloadAction<any>) => {
      state.queueList = action.payload.applications;
    },
    setQueueLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQueueError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setApplicationQueue, setQueueLoading, setQueueError } =
  getQueueApplicationsSlice.actions;
export default getQueueApplicationsSlice.reducer;
