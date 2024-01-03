"use client";
import Navbar from "@/components/Header/Navbar";
import { trackApplication } from "@/redux/actions/Application/trackApplication.service";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrackApplications = () => {
  const { loading, error } = useSelector(
    (state: RootState) => state.trackApplication
  );
  const [applicationId, setApplicationId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [trackedData, setTrackedData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationId(e.target.value);
  };

  const handleTrack = async () => {
    try {
      const response = await trackApplication(dispatch, applicationId);
      console.log(response);
      setTrackedData(response);
      setApplicationId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full h-full">
      <Navbar />
      <div className="container px-5 md:px-18 lg:px-20 py-10 mx-auto w-full md:w-[70%] flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4 text-[#0d7836]">
          Track Application
        </h1>

        <div className="mb-4 border p-4 rounded-md bg-gray-100 w-full shadow-md">
          <label htmlFor="applicationId" className="block text-gray-600 mb-2">
            Enter Application ID:
          </label>
          <div className="flex items-center gap-4 flex-wrap flex-col md:flex-row">
            <input
              type="text"
              id="applicationId"
              value={applicationId}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-400 rounded focus:outline-none focus:border-green-500 w-full"
            />
            <button
              onClick={handleTrack}
              className={`bg-[#0d7836] text-white px-4 py-2 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>
        </div>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {trackedData && (
          <>
            {/* Real fetched data */}
            <div className="flex flex-col items-center w-full mt-4">
              <div className="bg-gray-100 border p-4 rounded-md w-full flex flex-row items-center justify-between shadow-md">
                <div className="flex items-center gap-2 flex-col">
                  <p className="text-green-500 font-semibold">
                    Queue Position:
                  </p>
                  <span>{trackedData.queuePosition}</span>
                </div>
                <div className="flex items-center gap-2 flex-col">
                  <p className="text-green-500 font-semibold">Queue Status:</p>
                  <span>{trackedData.queueStatus}</span>
                </div>
                <div className="flex items-center gap-2 flex-col">
                  <p className="text-green-500 font-semibold">
                    Application Type:
                  </p>
                  <span>{trackedData.applicationType}</span>
                </div>
              </div>
              <button
                className="cursor-pointer mt-2 focus:outline-none"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <FaCaretUp className="text-[#0d7836] text-2xl" />
                ) : (
                  <FaCaretDown className="text-[#0d7836] text-2xl" />
                )}
              </button>

              {/* Details section */}
              {showDetails && (
                <div className="mt-4 flex flex-col items-center w-full">
                  <p className="text-green-500 font-semibold mb-2">
                    Processing State:
                  </p>
                  <span>{trackedData.processingState}</span>
                  <p className="text-green-500 font-semibold mb-2">
                    Processing Office:
                  </p>
                  <span>{trackedData.processingOffice}</span>
                  {/* Add more details as needed */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TrackApplications;
