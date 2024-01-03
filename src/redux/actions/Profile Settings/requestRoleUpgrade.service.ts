import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  roleRequestFulfilled,
  roleRequestPending,
  roleRequestRejected,
} from "@/redux/features/roleRequestSlice";

export const requestRoleUpgradeService = async (dispatch: Dispatch) => {
  const url = `${baseURL}/role-request-upgrade`;

  try {
    dispatch(roleRequestPending());
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    toast.success("Request sent successfully");
    axiosWithToken.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Cookies.get("token")}`;

    dispatch(roleRequestFulfilled(response.data));
    return response.data;
  } catch (error) {
    toast.error("Failed to send request");
    dispatch(roleRequestRejected("Failed to send request"));
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
