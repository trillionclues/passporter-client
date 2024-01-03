import axios from "axios";
import { Dispatch } from "redux";
import { applicationURL } from "@/constants/baseURL";
import Cookies from "js-cookie";
import {
  setLoading,
  setError,
  setApplication,
} from "@/redux/features/fetchApplications";

export const getApplicantApplications = async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${applicationURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    // console.log(response);
    if (response.status === 200) {
      const application = response.data;
      dispatch(setApplication(application));
      dispatch(setLoading(false));
      return true;
    } else {
      console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(setError("Failed to fetch Applications!"));
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};
