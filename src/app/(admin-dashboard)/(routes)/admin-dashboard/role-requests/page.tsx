"use client";
import EmptyApplication from "@/components/Events/EmptyApplication";
import { getRoleRequests } from "@/redux/actions/Admin/getRoleUpgradeRequests.service";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoleRequests = () => {
  const { roleUpgradeRequests, loading } = useSelector(
    (state: RootState) => state.fetchRoleUpgradeRequests
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleGetRoleRequests = async () => {
    await getRoleRequests(dispatch);
  };
  //   console.log(roleUpgradeRequests);

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
                    className="border p-4 rounded-md bg-white"
                  >
                    <p>
                      User: {request.firstname} {request.lastname}
                    </p>
                    <p>Email: {request.email}</p>
                    <p>Role Upgrade Request: {request.roleUpgradeRequest}</p>
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
