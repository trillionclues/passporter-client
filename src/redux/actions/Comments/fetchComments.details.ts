import { applicationURL } from "@/constants/baseURL";
import { setComments, setLoading } from "@/redux/features/fetchCommentSlice";
import axios from "axios";
import { Dispatch } from "redux";

export const fetchComments = async (
  dispatch: Dispatch,
  applicationId: string
) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `${applicationURL}/comments/${applicationId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const comments = response.data;
      dispatch(setLoading(false));
      dispatch(setComments(comments));
      return comments;
    } else {
      dispatch(setLoading(false));
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
    throw new Error(`Unexpected response status: ${error}`);
  }
};
