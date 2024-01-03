import { applicationURL } from "@/constants/baseURL";
import axios from "axios";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { setError, setSubmitting } from "../../features/submitCommentSlice";

export const submitComments = async (
  dispatch: Dispatch,
  applicationId: string,
  text: string,
  userRole: string
) => {
  try {
    dispatch(setSubmitting(true));
    const response = await axios.post(
      `${applicationURL}/comments/add-applicant-comment`,
      {
        applicationId,
        text,
        userRole,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    dispatch(setError(""));
    dispatch(setSubmitting(false));

    if (response.status === 201) {
      return true;
    } else {
      dispatch(setError("Unexpected response status"));
      dispatch(setSubmitting(false));
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(setError("Unexpected response status"));
    dispatch(setSubmitting(false));
    console.log(error);
  }
};
