import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  deleteRequestFulfilled,
  deleteRequestPending,
  deleteRequestRejected,
} from "@/redux/features/deleteAccountSlice";

export const deleteAccountService = async (dispatch: Dispatch) => {
  const url = `${baseURL}/delete-account`;

  try {
    dispatch(deleteRequestPending());
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    toast.success("Account deleted successfully!");
    axiosWithToken.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Cookies.get("token")}`;

    dispatch(deleteRequestFulfilled(response.data));
    return response.data;
  } catch (error) {
    toast.error("Failed to delete account. Please try again later!");
    dispatch(deleteRequestRejected("Failed to send request"));
    throw new Error("Failed to send request");
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
