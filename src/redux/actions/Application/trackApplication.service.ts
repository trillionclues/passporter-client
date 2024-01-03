import axios from "axios";
import { Dispatch } from "redux";
import { applicationURL } from "@/constants/baseURL";
import { toast } from "react-toastify";
import {
  trackApplicationSuccess,
  trackApplicationError,
  trackApplicationLoading,
} from "@/redux/features/trackApplicationSlice";

export const trackApplication = async (
  dispatch: Dispatch,
  applicationId: any
) => {
  try {
    dispatch(trackApplicationLoading(true));

    const response = await axios.get(
      `${applicationURL}/track-application/${applicationId}`
    );

    if (response.status === 200) {
      dispatch(trackApplicationSuccess(response.data));
      toast.success("Request sent successfully!");
      dispatch(trackApplicationLoading(false));
      return response.data;
    } else {
      dispatch(trackApplicationError("Unexpected response status"));
      dispatch(trackApplicationLoading(false));
      toast.error("Request failed!");
      // console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(trackApplicationError("Failed to fetch Application details!"));
    dispatch(trackApplicationLoading(false));
    console.log(error);
  } finally {
    dispatch(trackApplicationLoading(false));
  }
};
