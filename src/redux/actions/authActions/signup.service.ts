import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import { setUser, setLoading } from "@/redux/features/authSlice";
import { setLoginError } from "@/redux/features/authSlice";

export const signUpService = async (
  credentials: {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
  },
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${baseURL}/register`, credentials);

    if (response.status === 200) {
      const user = response.data;

      dispatch(
        setUser({
          user: response.data,
          token: user.token,
          sessionData: user,
        })
      );

      dispatch(setLoading(false));
      return true;
    } else if (response.status === 401) {
      const errorMessage = response.data.error;
      dispatch(setLoginError(errorMessage));
      dispatch(setLoading(false));
      return false;
    } else if (response.status === 500) {
      const errorMessage = response.data.message;
      console.log("Server error:", errorMessage);
      dispatch(setLoginError(errorMessage));
      return false;
    } else {
      const errorMessage = response.data.message;
      dispatch(setLoginError(errorMessage));
      dispatch(setLoading(false));
      return response.data.message;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      dispatch(setLoginError(errorMessage));
    } else {
      dispatch(setLoading(false));
      dispatch(setLoginError("Failed to register!"));
    }
    throw new Error("Failed to signup");
  }
};
