import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import {
  setError,
  setNewUserPassword,
  setSubmitting,
} from "@/redux/features/forgotPasswordSlice";

export const resetPasswordService = async (
  newPassword: string,
  dispatch: Dispatch
) => {
  try {
    dispatch(setSubmitting(true));

    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    const response = await axios.put(
      `${baseURL}/auth/reset-password/${token}`,
      {
        newPassword,
      }
    );

    if (response.status === 200) {
      const newPassword = response.data.newPassword;
      dispatch(setNewUserPassword(newPassword));
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
