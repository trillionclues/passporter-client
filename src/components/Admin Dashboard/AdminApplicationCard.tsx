"use client";

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import CustomButton from "../Reusables/CustomButton";
import { useDateFormat } from "@/hooks/use-date-formatter";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { getApplicationDetails } from "@/redux/actions/Application/get.application.details";

const AdminApplicationCard = ({ application }: any) => {
  const [copied, setCopied] = useState(false);
  const formattedDate = useDateFormat(application.createdAt);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(application._id);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleClickViewMore = () => {
    getApplicationDetails(dispatch, application._id);
    const dynamicLink = `/admin-dashboard/${application._id}`;
    router.push(dynamicLink);
  };

  return (
    <div className="px-6 py-5 bg-[#F7F7F7] rounded-md border ">
      <div className="flex items-center justify-between">
        <p className="text-[#0d7836] text-[11px] font-medium">
          {formattedDate}
        </p>
        <p className="text-[#0d7836] text-[11px] font-medium">
          {application.queueStatus}
        </p>
      </div>
      <header className="my-3 lg:my-5 text-[#0d7836] font-bold p-0">
        {application.processingState}
      </header>
      <div className="p-0 mt-5 flex flex-col md:flex-row justify-between gap-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#0d7836] font-medium">
            <span className="hidden md:inline">APPLICATION</span> TYPE:{" "}
            {application.applicationType}
          </p>
          <p
            className="flex items-center text-xs gap-1 cursor-pointer text-[#0d7836] bg-[#FEF5E8] font-medium bg-transparent hover:opacity-50 hover:border-b-2 hover:border-red-500"
            onClick={onCopy}
          >
            {copied ? (
              <FaCheck className="w-4 h-4" />
            ) : (
              <FaRegCopy className="w-4 h-4" />
            )}
            Copy <span className="hidden md:inline">application</span> ID
          </p>
        </div>

        <CustomButton
          text="CLICK TO VIEW MORE"
          href={`/admin-dashboard/[applicationId]`}
          className="flex flex-row justify-center items-center xt-[#0d7836] hover:bg-transparent bg-transparent text-xs p-0 hover:opacity-50 rounded-[24px] py-1"
          icon={<FiArrowRight className="h-3 w-3 ml-2" />}
          onClick={handleClickViewMore}
        />
      </div>
    </div>
  );
};

export default AdminApplicationCard;
