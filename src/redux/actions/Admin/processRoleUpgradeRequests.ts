import axios from "axios";
import { adminURL } from "@/constants/baseURL";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  setRoleUpgradeError,
  setRoleUpgradeLoading,
  setRoleUpgradeSuccess,
} from "@/redux/features/Admin/processRoleRequestSlice";

export const processRoleUpgradeRequests = async (
  dispatch: Dispatch,
  applicantId: any,
  action: any
) => {
  try {
    dispatch(setRoleUpgradeLoading());

    const response = await axios.put(
      `${adminURL}/upgrade-applicant-role/${applicantId}/${action}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    toast.success("Request processed successfully");
    dispatch(setRoleUpgradeSuccess(response.data));
    return response.data;
  } catch (error) {
    toast.error("Failed to process request");
    dispatch(setRoleUpgradeError("Failed to process request!"));
    throw new Error("Failed to process request");
  } finally {
    dispatch(setRoleUpgradeLoading());
  }
};
