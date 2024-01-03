import { ForgotPasswordError } from "@/types/ForgotPasswordError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface forgotPasswordProps {
  email: string;
  submitting: boolean;
  error: ForgotPasswordError | null;
  emailSent: boolean;
  newUserPassword: string;
}

const initialState: forgotPasswordProps = {
  email: "",
  submitting: false,
  emailSent: false,
  error: null,
  newUserPassword: "",
};

const passwordResetSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = { message: action.payload };
    },
    clearPasswordError: (state) => {
      state.error = null;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    sendPasswordResetToken: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.emailSent = true;
    },
    setNewUserPassword: (state, action: PayloadAction<string>) => {
      state.newUserPassword = action.payload;
    },
  },
});

export const {
  setError,
  clearPasswordError,
  setSubmitting,
  sendPasswordResetToken,
  setNewUserPassword,
} = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
