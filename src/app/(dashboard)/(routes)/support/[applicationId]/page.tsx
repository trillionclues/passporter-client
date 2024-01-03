"use client";
import React, { useEffect, useState } from "react";
import ApplicationLayout from "../../dashboard/(applicationId)/[applicationId]/layout";
import { fetchComments } from "@/redux/actions/Comments/fetchComments.details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { submitComments } from "@/redux/actions/Comments/submit.comment";
import { toast } from "react-toastify";

type commentProps = {
  commenterName: string;
  commentText: string;
  createdAt: string;
  profilePicture: string;
};
const ApplicationCustomerSupport = () => {
  const applicationId = useSelector(
    (state: RootState) => state.singleApplication.applicationDetails
  );
  const { loading, error } = useSelector(
    (state: RootState) => state.fetchComments
  );
  const { submitting } = useSelector((state: RootState) => state.submitComment);
  const [complaintText, setComplaintText] = useState("");
  const [comments, setComments] = useState<commentProps[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // get submitted comments
    const getAllComments = async () => {
      try {
        const response = await fetchComments(dispatch, applicationId._id);
        // console.log(response);
        setComments(response);
      } catch (error) {
        console.log(error);
      }
    };

    getAllComments();
  }, []);

  // submit new comment
  const handleSubmitComplaint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (complaintText.trim() !== "") {
        const success = await submitComments(
          dispatch,
          applicationId._id,
          complaintText,
          applicationId.role
        );

        if (success) {
          const response = await fetchComments(dispatch, applicationId._id);
          setComments(response);
          setComplaintText("");
          toast.success("Comment submitted successfully");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit comment");
    }
  };

  return (
    <ApplicationLayout>
      <div className="lg:border-t-[20px] lg:border-l-[20px] border-t border-gray-300 p-4 h-full overflow-y-auto lg:bg-white bg-gray-300">
        <h1 className="text-2xl font-semibold mb-4">Contact Support</h1>
        <form onSubmit={handleSubmitComplaint} className="mb-4">
          <textarea
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            placeholder="Enter your complaint here"
            className="w-full p-2 border border-gray-400 bg-[#e2f1ef] text-black rounded focus:outline-none focus:border-[#0d7836] mb-2 h-40"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0d7836] text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
          >
            {submitting ? "Sending..." : "Submit Complaint"}
          </button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="loading-spinner" />
          </div>
        ) : (
          <>
            {comments.length > 0 ? (
              <div className="mt-4 w-full">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className={`border rounded p-2 mb-2 ${
                      index % 2 === 0
                        ? "bg-gray-100 flex"
                        : "bg-gray-200 flex flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex flex-col w-1/2 ${
                        index % 2 === 0 ? "mr-4" : " ml-4 w-1/2"
                      }`}
                    >
                      <div className="mx-2 flex p-2">
                        <div className="hidden md:block p-2 rounded-full w-12 h-12 flex-shrink-0">
                          <img
                            src={comment.profilePicture}
                            alt="profile picture"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-2 flex flex-col">
                          <p className="text-gray-500">{comment.commentText}</p>
                          <p className="font-semibold">
                            {comment.commenterName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments yet.</p>
            )}
          </>
        )}
      </div>
    </ApplicationLayout>
  );
};

export default ApplicationCustomerSupport;
