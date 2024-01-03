import axios from "axios";
import { Dispatch } from "redux";
import { applicationURL } from "@/constants/baseURL";
import { setError, setSubmitted } from "@/redux/features/applicationSlice";
import { setLoading } from "@/redux/features/authSlice";
import { ApplicationData } from "@/types/ApplicationData";
import Cookies from "js-cookie";

export const handleApplicationSubmit = async (
  formData: ApplicationData,
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      `${applicationURL}/create-application`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (response.status === 201) {
      dispatch(setSubmitted(true));
      // console.log("Application submitted successfully:", response.data);
    } else {
      // console.error(`Unexpected response status: ${response.status}`);
      console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      dispatch(setError(errorMessage));
      return false;
    } else {
      dispatch(setError("Failed to submit application!"));
    }
    console.log(error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
