import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import { setUser, setLoading } from "@/redux/features/authSlice";
import { setLoginError } from "@/redux/features/authSlice";
import Cookies from "js-cookie";

export const loginService = async (
  credentials: { email: string; password: string },
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${baseURL}/auth/login`, credentials);

    if (response.status === 200) {
      const user = response.data;

      Cookies.set("token", user.token, { expires: 1 });
      Cookies.set("sessionData", JSON.stringify(user), { expires: 1 });
      axiosWithToken.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;

      dispatch(
        setUser({
          user: response.data,
          token: user.token,
          sessionData: user,
        })
      );
      dispatch(setLoading(false));
      return true;
    } else if (response.status === 500) {
      const errorMessage = response.data.message;
      console.log("Server error:", errorMessage);
      dispatch(setLoginError(errorMessage));
      dispatch(setLoading(false));
      return false;
    } else {
      const errorMessage = response.data.message;
      dispatch(setLoginError(errorMessage));
      dispatch(setLoading(false));
      return response.data.message;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    dispatch(setLoginError(errorMessage));
    dispatch(setLoading(false));
    throw new Error("Failed to log in");
  } finally {
    dispatch(setLoading(false));
  }
};

export const axiosWithToken = axios.create({
  baseURL,
});

axiosWithToken.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
