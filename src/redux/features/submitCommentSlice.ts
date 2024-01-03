import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface submitCommentProps {
  comment: string;
  loading: boolean;
  error: string;
  submitting: boolean;
}

const initialState: submitCommentProps = {
  comment: "",
  loading: false,
  error: "",
  submitting: false,
};

const submitCommentSlice = createSlice({
  name: "submitComment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
});

export const { setLoading, setSubmitting, setError } =
  submitCommentSlice.actions;

export default submitCommentSlice.reducer;
