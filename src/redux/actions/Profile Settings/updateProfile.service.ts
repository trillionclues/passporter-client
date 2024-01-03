import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  updateProfileFulfilled,
  updateProfilePending,
  updateProfileRejected,
} from "@/redux/features/updateProfileSettingSlice";

export const updateProfileService = async (data: any, dispatch: Dispatch) => {
  const url = `${baseURL}/update-user`;

  try {
    dispatch(updateProfilePending());

    // console.log("Request Payload:", data);
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    // console.log("Update Profile Response:", response);

    toast.success("Profile updated successfully");
    axiosWithToken.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Cookies.get("token")}`;

    dispatch(updateProfileFulfilled(response.data));
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update profile");
    dispatch(updateProfileRejected(error.message));
    throw new Error("Failed to update profile");
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
