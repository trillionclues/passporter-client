import { store } from "@/redux/store/store";

export const getUserRole = () => {
  const state = store.getState();
  const userData = state.userData;
  // console.log(userData?.userData.getApplicant.role);
  return userData?.userData?.getApplicant?.role || "applicant";
};
