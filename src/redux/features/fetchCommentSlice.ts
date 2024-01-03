import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface fetchCommentsProps {
  loading: boolean;
  error: string;
  comments: any[];
  commentId: string;
  submitting: boolean;
}

const initialState: fetchCommentsProps = {
  loading: false,
  error: "",
  comments: [],
  commentId: "",
  submitting: false,
};

const fetchCommentsSlice = createSlice({
  name: "fetchComments",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setComments: (state, action: PayloadAction<any>) => {
      state.comments = action.payload;
    },
    setCommentId: (state, action: PayloadAction<string>) => {
      state.commentId = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setComments,
  setCommentId,
  setSubmitting,
} = fetchCommentsSlice.actions;

export default fetchCommentsSlice.reducer;
