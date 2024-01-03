"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "@/components/Reusables/CustomButton";
import EmptyApplication from "@/components/Events/EmptyApplication";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import ApplicationCard from "@/components/Dashboard/ApplicationCard";
import { getApplicantApplications } from "@/redux/actions/Application/get.applicant.applications";
import { logoutService } from "@/redux/actions/authActions/logout.service";

const DashboardPage = () => {
  const { applications, loading } = useSelector(
    (state: RootState) => state.applicantApplications
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await logoutService(dispatch);
    router.push("/login");
  };
  const handleGetApplications = async () => {
    await getApplicantApplications(dispatch);
  };

  useEffect(() => {
    handleGetApplications();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="loading-spinner" />
        </div>
      ) : (
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="py-3 flex justify-between items-center md:px-10 px-5">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/nis-logo.png"
                alt="passporter logo"
                className="object-contain w-24 lg:w-32"
                width={96}
                height={128}
              />
            </Link>
            <div
              className="flex items-center cursor-pointer hover:opacity-50 gap-2"
              onClick={handleLogout}
            >
              <TbLogout2 className="text-lg lg:text-xl" />
              <p className="text-[#0d7836] font-medium text-sm lg:text-lg">
                Sign out
              </p>
            </div>
          </div>
          <hr className="border-b-8 border-[#0d7836]" />
          <div className="flex flex-col p-5 max-w-[775px] mx-auto mt-2 md:mt-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-md md:text-2xl text-left font-bold text-[#0d7836]">
                Applications
              </p>
              {applications && applications?.length !== 0 && (
                <CustomButton
                  text="Create Application"
                  href="/create-application"
                  className="flex flex-row text-xs md:text-sm justify-center items-center bg-[#0d7836] text-white px-2 md:px-4 rounded-[24px] py-1"
                  icon={<FiArrowRight className="text-white h-4 w-4" />}
                />
              )}
            </div>
            {applications?.length === 0 && (
              <div className="flex flex-col gap-6 items-center justify-center h-[60vh]">
                <EmptyApplication text="No applications to show. Apply for a passport now!" />
                <CustomButton
                  text="Create Application"
                  href="/create-application"
                  className="flex flex-row justify-center items-center bg-[#0d7836] text-white rounded-[24px] px-4 py-1 text-xs md:text-sm"
                  icon={<FiArrowRight className="text-white h-4 w-4" />}
                />
              </div>
            )}

            {applications && applications?.length !== 0 && (
              <div className="flex flex-col gap-5 mt-8">
                {applications?.map((application: any) => (
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

export default DashboardPage;
