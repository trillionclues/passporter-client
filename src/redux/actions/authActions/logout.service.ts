import axios, { AxiosResponse } from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import { logout, setLoading } from "@/redux/features/authSlice";
import { setLoginError } from "@/redux/features/authSlice";
import Cookies from "js-cookie";
import { setUserDetails } from "@/redux/features/userDataSlice";
import { toast } from "react-toastify";

export const logoutService = async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${baseURL}/auth/logout`);

    if (response.status === 200) {
      Cookies.remove("token");
      Cookies.remove("sessionData");

      // Reset user details to null when logging ou
      dispatch(setUserDetails(null));

      dispatch(setLoading(false));
      dispatch(setLoginError(""));
      dispatch(logout());
      toast.success("Logout successful!");
      return true;
    } else {
      const errorMessage = response.data.message;
      console.log("Logout error:", errorMessage);
      dispatch(setLoginError(errorMessage));
      dispatch(setLoading(false));
      toast.error("Logout failed!");
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    dispatch(setLoginError(errorMessage));
    dispatch(setLoading(false));
    toast.error("Logout failed!");
    throw new Error("Failed to logout");
  } finally {
    dispatch(setLoading(false));
  }
};
