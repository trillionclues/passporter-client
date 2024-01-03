import { applicationURL } from "@/constants/baseURL";
import {
  setApplicationDetails,
  setErrorDetails,
  setLoadingDetails,
} from "@/redux/features/fetchApplicationDetailsSlice";
import axios from "axios";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

export const getApplicationDetails = async (
  dispatch: Dispatch,
  applicationId: string
) => {
  try {
    dispatch(setLoadingDetails(true));

    const response = await axios.get(`${applicationURL}/${applicationId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    if (response.status === 200) {
      const applicationDetails = response.data;
      dispatch(setApplicationDetails(applicationDetails));
      dispatch(setLoadingDetails(false));
    } else {
      dispatch(setLoadingDetails(false));
      console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(setLoadingDetails(false));
    dispatch(setErrorDetails("Failed to fetch Application Details!"));
    console.log(error);
  }
};
