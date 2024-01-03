"use client";
import {
  FaSortNumericDown,
  FaRegClock,
  FaClipboard,
  FaCheck,
  FaRegCopy,
} from "react-icons/fa";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import DashboardInfoCards from "@/components/Dashboard/Interactives/DashboardInfoCards";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MapBoxLocation from "@/components/Dashboard/Interactives/MapBox";
import AdminDashboardLayout from "@/app/(admin-dashboard)/layout";

const ApplicationDashboardContent = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { applicationDetails: application, loadingDetails } = useSelector(
    (state: RootState) => state.singleApplication
  );

  const handleGoToSettings = () => {
    router.push(`/settings/${application?._id}`);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(application._id);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      {loadingDetails ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="loading-spinner" />
        </div>
      ) : (
        <AdminDashboardLayout>
          <div className="lg:border-t-[20px] lg:border-l-[20px] border-t border-gray-300 p-4 h-full overflow-y-auto lg:bg-white bg-gray-300 z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              <DashboardInfoCards
                title="Application Type"
                icon={
                  <FaRegClock className="text-2xl text-[#0d7836] mr-4 hover:text-white" />
                }
                value={application?.applicationType}
              />
              <DashboardInfoCards
                title="Queue Position"
                icon={
                  <FaSortNumericDown className="text-2xl text-[#0d7836] mr-4 hover:text-white" />
                }
                value={application?.queuePosition}
              />
              <DashboardInfoCards
                title="Queue Status"
                icon={
                  <FaClipboard className="text-2xl text-[#0d7836] mr-4 hover:text-white" />
                }
                value={application?.queueStatus}
              />
            </div>

            <div className="mt-4 z-10">
              <MapBoxLocation location={application?.processingState} />
            </div>
            <div className="flex justify-between mt-8">
              <button
                className="bg-[#0d7836] hover:bg-green-700 text-white py-2 px-4 rounded flex items-center gap-2"
                onClick={onCopy}
              >
                {copied ? (
                  <FaCheck className="w-4 h-4" />
                ) : (
                  <FaRegCopy className="w-4 h-4" />
                )}
                Copy <span className="hidden sm:inline">Application</span> ID
              </button>

              <button
                className="bg-[#0d7836] hover:bg-green-700 text-white py-2 px-4 rounded"
                onClick={handleGoToSettings}
              >
                Go to Settings
              </button>
            </div>
          </div>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default ApplicationDashboardContent;
