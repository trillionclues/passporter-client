import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import {
  sendPasswordResetToken,
  setError,
  setSubmitting,
} from "@/redux/features/forgotPasswordSlice";

export const forgetPasswordService = async (
  email: string,
  dispatch: Dispatch
) => {
  try {
    dispatch(setSubmitting(true));
    const response = await axios.post(
      `${baseURL}/auth/reset-password/send-token`,
      {
        email,
      }
    );

    if (response.status === 200) {
      const userEmail = response.data.email;
      dispatch(sendPasswordResetToken(userEmail));
      dispatch(setSubmitting(false));
      return true;
    } else if (response.status === 500) {
      const errorMessage = response.data.error;
      dispatch(setError(errorMessage));
      dispatch(setSubmitting(false));
      return false;
    } else if (response.status === 401) {
      const errorMessage = response.data.error;
      dispatch(setError(errorMessage));
      dispatch(setSubmitting(false));
      return false;
    } else {
      const errorMessage = response.data.message;
      dispatch(setError(errorMessage));
      dispatch(setSubmitting(false));
      return response.data.message;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      dispatch(setError(errorMessage));
    }
    dispatch(setSubmitting(false));
    return false;
  }
};
