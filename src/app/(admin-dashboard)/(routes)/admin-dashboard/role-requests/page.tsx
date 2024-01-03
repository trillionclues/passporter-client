"use client";
import EmptyApplication from "@/components/Events/EmptyApplication";
import { getRoleRequests } from "@/redux/actions/Admin/getRoleUpgradeRequests.service";
import { processRoleUpgradeRequests } from "@/redux/actions/Admin/processRoleUpgradeRequests";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const RoleRequests = () => {
  const { roleUpgradeRequests, loading } = useSelector(
    (state: RootState) => state.fetchRoleUpgradeRequests
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleGetRoleRequests = async () => {
    await getRoleRequests(dispatch);
  };
  // console.log(roleUpgradeRequests);

  const handleProcessRoleRequest = async (
    applicantId: string,
    action: string
  ) => {
    try {
      await processRoleUpgradeRequests(dispatch, applicantId, action);
      await handleGetRoleRequests();
    } catch (error) {
      console.error("Error processing role request:", error);
    }
  };

  useEffect(() => {
    handleGetRoleRequests();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="loading-spinner" />
        </div>
      ) : (
        <div className="lg:border-t-[20px] lg:border-l-[20px] border-t border-gray-300 p-4 h-full overflow-y-auto lg:bg-white bg-gray-300 z-10">
          <div className="flex flex-col p-5 max-w-[775px] mx-auto md:mt-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-md md:text-2xl text-left font-bold text-[#0d7836]">
                Role Upgrade Requests
              </p>
            </div>

            {roleUpgradeRequests?.length === 0 ? (
              <div className="flex flex-col gap-6 items-center justify-center h-[60vh]">
                <EmptyApplication text="No requests at the moment!" />
              </div>
            ) : (
              <div className="flex flex-col gap-6 overflow-y-auto h-full md:h-[70vh] mt-4">
                {roleUpgradeRequests?.map((request: any) => (
                  <div
                    key={request._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 rounded-md border bg-white"
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <img
                        src={request.profilePicture}
                        alt={`${request.firstname} ${request.lastname}'s avatar`}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">
                          {request.firstname} {request.lastname}
                        </p>
                        <p className="text-sm text-gray-600">
                          Requested on:{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleProcessRoleRequest(request._id, "approve")
                        }
                        className={`bg-[#0d7836] text-white px-3 py-1 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? (
                          <div className="animate-spin">
                            <FaSpinner className="ml-2" />
                          </div>
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleProcessRoleRequest(request._id, "reject")
                        }
                        className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? (
                          <div className="animate-spin">
                            <FaSpinner className="ml-2" />
                          </div>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RoleRequests;
