import axios from "axios";
import { adminURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  setApplicationQueue,
  setQueueError,
  setQueueLoading,
} from "@/redux/features/fetchQueueApplications";

export const getQueueApplications = async (dispatch: Dispatch) => {
  try {
    dispatch(setQueueLoading(true));
    const response = await axios.get(`${adminURL}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    // console.log(response);

    if (response.status === 200) {
      const application = response.data;
      dispatch(setApplicationQueue(application));
      dispatch(setQueueLoading(false));
      return true;
    } else {
      console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(setQueueError("Failed to fetch Applications!"));
    console.log(error);
  } finally {
    dispatch(setQueueLoading(false));
  }
};
