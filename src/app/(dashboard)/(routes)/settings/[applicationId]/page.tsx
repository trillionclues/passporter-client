"use client";
import React, { useState } from "react";
import ApplicationLayout from "../../dashboard/(applicationId)/[applicationId]/layout";
import {
  FaEnvelope,
  FaPencilAlt,
  FaSave,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { FaUserShield, FaTrashAlt } from "react-icons/fa";
import { updateProfileService } from "@/redux/actions/Profile Settings/updateProfile.service";
import { useRouter } from "next/navigation";
import { requestRoleUpgradeService } from "@/redux/actions/Profile Settings/requestRoleUpgrade.service";
import { getUserDetails } from "@/redux/actions/authActions/getUserDetails.service";
import { getUserRole } from "@/lib/getUserRole";
import { deleteAccountService } from "@/redux/actions/Profile Settings/deleteAccount.service";

const ApplicationCustomerSettings = () => {
  const { userData } = useSelector((state: RootState) => state.userData);
  const { submitting } = useSelector((state: RootState) => state.updateProfile);
  const { roleUpgradeSubmitting, error } = useSelector(
    (state: RootState) => state.roleRequest
  );
  const { loading } = useSelector((state: RootState) => state.deleteAccount);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState({
    profilePicture: userData?.getApplicant.profilePicture,
    firstname: userData?.getApplicant.firstname,
    lastname: userData?.getApplicant.lastname,
    email: userData?.getApplicant.email,
  });

  // update user profile
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // console.log("Modified UserProfile:", userProfile);
      await updateProfileService(userProfile, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  // account managemnent nand role upgrade
  const handleRoleUpgrade = async () => {
    try {
      await requestRoleUpgradeService(dispatch);

      const userRole = getUserRole();

      if (userRole === "admin") {
        router.push("/admin-dashboard");
      }

      // refetch user data
      getUserDetails(dispatch);
    } catch (error) {
      console.error("Role upgrade request failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteAccountService(dispatch);
        router.push("/");
      } catch (error) {
        console.error("Account deletion failed:", error);
      }
    }
  };

  return (
    <ApplicationLayout>
      <div className="lg:border-t-[20px] lg:border-l-[20px] border-t border-gray-300 p-4 h-full overflow-y-auto lg:bg-white bg-gray-300">
        <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 underline">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex items-center mb-5">
                <label
                  htmlFor="profilePicture"
                  className="flex items-center cursor-pointer"
                >
                  {userProfile.profilePicture ? (
                    <>
                      <img
                        src={userProfile.profilePicture}
                        alt="User profilePicture"
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <FaPencilAlt className="text-gray-600 hover:text-[#0d7836]" />
                    </>
                  ) : (
                    <>
                      <span className="ml-2">Change profilePicture</span>
                      <FaPencilAlt className="text-gray-600 hover:text-[#0d7836]" />
                    </>
                  )}
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mb-6 flex items-center w-full">
                <label
                  htmlFor="firstname"
                  className="text-gray-600 flex justify-start items-center gap-2 w-[45%]"
                >
                  <FaUser className="mr-1" /> <span>First Name</span>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={userProfile.firstname}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-400 rounded focus:outline-none focus:border-green-500 w-full"
                />
              </div>

              <div className="mb-6 flex items-center w-full">
                <label
                  htmlFor="lastname"
                  className="text-gray-600 flex justify-start items-center gap-2 w-[45%]"
                >
                  <FaUser className="mr-2" /> <span>Last Name</span>
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={userProfile.lastname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="mb-8 flex items-center">
                <label
                  htmlFor="email"
                  className="block text-gray-600 flex justify-start items-center gap-2 w-[45%]"
                >
                  <FaEnvelope className="mr-2" /> <span>Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className={`mt-4 w-full flex items-center justify-between bg-[#0d7836] text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md ${
                  submitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#0d7836] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d7836]"
                }`}
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <span>Save Changes</span>
                )}
                {submitting ? (
                  <div className="animate-spin">
                    <FaSpinner className="ml-2" />
                  </div>
                ) : (
                  <FaSave className="ml-2" />
                )}
              </button>
            </form>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 underline">
              Account Management
            </h2>

            {/* Role Upgrade Request */}
            {/* display error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {userData?.getApplicant.roleUpgradeRequest === "none" && (
              <button
                onClick={handleRoleUpgrade}
                className={`w-full flex items-center justify-between py-4 px-4 bg-blue-500 text-white rounded-md ${
                  roleUpgradeSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                }`}
              >
                <span>Request Role Upgrade</span>{" "}
                {roleUpgradeSubmitting ? (
                  <div className="animate-spin">
                    <FaSpinner className="ml-2" />
                  </div>
                ) : (
                  <FaUserShield className="ml-2" />
                )}
              </button>
            )}
            {userData?.getApplicant.roleUpgradeRequest === "pending" && (
              <div className="flex items-center justify-center h-20 bg-gray-300 rounded-md">
                <FaSpinner className="animate-spin text-blue-500" />
                <span className="ml-2 text-blue-500">Request pending...</span>
              </div>
            )}

            {/* Delete Account */}
            <button
              onClick={handleDeleteAccount}
              className={`w-full mt-4 flex items-center justify-between py-4 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>Delete Account</span>
              {loading ? (
                <div className="animate-spin">
                  <FaSpinner className="ml-2" />
                </div>
              ) : (
                <FaTrashAlt className="ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default ApplicationCustomerSettings;
