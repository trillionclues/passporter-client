import axios from "axios";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { baseURL } from "@/constants/baseURL";
import { setError, setUserDetails } from "@/redux/features/userDataSlice";
import { setLoading } from "@/redux/features/userDataSlice";

export const getUserDetails = async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${baseURL}/user-details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

      const user = response.data;
      dispatch(setUserDetails(user));
      dispatch(setLoading(false));
      return true;
  } catch (error) {
    dispatch(setError(error as string));
  } finally {
    dispatch(setLoading(false));
  }
};
