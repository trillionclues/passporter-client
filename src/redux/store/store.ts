import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import applicationFormReducer from "../features/applicationSlice";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import fetchApplicationsReducer from "../features/fetchApplications";
import fetchApplicationDetailsReducer from "../features/fetchApplicationDetailsSlice";
import fetchCommentReducer from "../features/fetchCommentSlice";
import submitCommentReducer from "../features/submitCommentSlice";
import updateProfileSettingReducer from "../features/updateProfileSettingSlice";
import userDataReducer from "../features/userDataSlice";
import roleRequestReducer from "../features/roleRequestSlice";
import deleteAccountReducer from "../features/deleteAccountSlice";
import trackApplicationReducer from "../features/trackApplicationSlice";
import getQueueApplications from "../features/fetchQueueApplications";
import fetchRoleUpgradeRequestsReducer from "../features/Admin/fetchRoleUpgradeRequestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    applicationForm: applicationFormReducer,
    applicantApplications: fetchApplicationsReducer,
    singleApplication: fetchApplicationDetailsReducer,
    fetchComments: fetchCommentReducer,
    submitComment: submitCommentReducer,
    updateProfile: updateProfileSettingReducer,
    userData: userDataReducer,
    roleRequest: roleRequestReducer,
    deleteAccount: deleteAccountReducer,
    trackApplication: trackApplicationReducer,
    getQueueApplications: getQueueApplications,
    fetchRoleUpgradeRequests: fetchRoleUpgradeRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
