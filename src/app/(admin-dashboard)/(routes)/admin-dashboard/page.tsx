"use client";
import ApplicationCard from "@/components/Dashboard/ApplicationCard";
import EmptyApplication from "@/components/Events/EmptyApplication";
import { getQueueApplications } from "@/redux/actions/Admin/getQueueApplications.service";
import { logoutService } from "@/redux/actions/authActions/logout.service";
import { AppDispatch, RootState } from "@/redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboardPage = () => {
  const { queueList, loading } = useSelector(
    (state: RootState) => state.getQueueApplications
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // console.log(queueList);

  const handleLogout = async () => {
    await logoutService(dispatch);
    router.push("/login");
  };

  const handleGetQueueApplications = async () => {
    await getQueueApplications(dispatch);
  };

  useEffect(() => {
    handleGetQueueApplications();
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
                Application List
              </p>
            </div>

            {queueList?.length === 0 ? (
              <div className="flex flex-col gap-6 items-center justify-center h-[60vh]">
                <EmptyApplication text="No applications in the queue." />
              </div>
            ) : (
              <div className="flex flex-col gap-6 overflow-y-auto h-full md:h-[70vh] mt-4">
                {queueList?.map((application) => (
                  <ApplicationCard
                    key={application._id}
                    application={application}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardPage;
