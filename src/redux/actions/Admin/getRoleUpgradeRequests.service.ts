import axios from "axios";
import { adminURL } from "@/constants/baseURL";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  fetchRoleUpgradeRequestLoading,
  fetchRoleUpgradeRequestsFailure,
  fetchRoleUpgradeRequestsSuccess,
} from "@/redux/features/Admin/fetchRoleUpgradeRequestsSlice";

export const getRoleRequests = async (dispatch: Dispatch) => {
  try {
    dispatch(fetchRoleUpgradeRequestLoading(true));

    const response = await axios.get(`${adminURL}/role-requests`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    if (response.status === 200) {
      const roleRequests = response.data;
      dispatch(fetchRoleUpgradeRequestsSuccess(roleRequests));
      dispatch(fetchRoleUpgradeRequestLoading(false));
      return true;
    } else {
      console.error("Response data:", response.data);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(fetchRoleUpgradeRequestsFailure("Failed to fetch role requests!"));
    console.log(error);
  } finally {
    dispatch(fetchRoleUpgradeRequestLoading(false));
  }
};
