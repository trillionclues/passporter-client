import CustomButton from "@/components/Reusables/CustomButton";
import React from "react";
import {
  resetFormData,
  setError,
  setStep,
  setSubmitted,
} from "@/redux/features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { handleApplicationSubmit } from "@/redux/actions/Application/submitapplication.service";
import Loader from "@/components/Reusables/Loader";
import { useRouter } from "next/navigation";

const StepFour = () => {
  const { isLoading, error, formData } = useSelector(
    (state: RootState) => state.applicationForm
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(3));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleApplicationSubmit(formData, dispatch);
      dispatch(resetFormData());
      dispatch(setStep(5));
      dispatch(setSubmitted(true));
    } catch (error) {
      dispatch(setError("Failed to submit application!"));
    }
  };

  const isPaymentRequired = true;
  return (
    <div className="h-full w-full flex items-start flex-col bg-white rounded-lg mb-10">
      <h2 className="text-2xl font-bold leading-9 text-[#0d7836] pb-2">
        Finishing up
      </h2>
      <p className="font-normal text-base leading-6 text-gray-600 items-center mb-1">
        Double-check everything looks OK before confirming.
      </p>

      <div className="w-full h-full flex flex-col justify-between gap-4">
        <section className="flex flex-col gap-4">
          <div className="border-b border-gray-200 py-3">
            <h3 className="font-bold text-base text-gray-600">Summary</h3>
            <ul className="list-disc pl-4 text-base text-[#0d7836]">
              <br />- Application type: {formData.applicationType}
              <br />- Processing State: {formData.processingState}
              <br />- Processing office : {formData.processingOffice}
              <br />- Validity: {formData.validity}
              <br />- Booklet type : {formData.bookletType}
              <br />
            </ul>
          </div>

          {/* NOT YET */}
          {isPaymentRequired && (
            <div className="border-b border-gray-200 py-2">
              <h3 className="font-bold text-base text-gray-600 mb-2">
                Payment Confirmation
              </h3>
              <p className="text-sm text-gray-600">Coming soon...</p>
            </div>
          )}
        </section>

        {error && (
          <div className="text-red-500 text-center text-sm">
            {error?.message}
          </div>
        )}
        <div className="w-full flex justify-between items-end py-4">
          <CustomButton
            text="Go Back"
            href=""
            className="cursor-pointer font-bold text-base text-gray-600 rounded-md hover:font-bold focus:text-[#0d7836]"
            onClick={handlePrevStep}
          />
          <button
            type="submit"
            className={`${
              isLoading
                ? "cursor-not-allowed loading"
                : "bg-[#0d7836] cursor-pointer hover:bg-teal"
            } font-bold text-base text-white rounded-md focus:bg-white-500 flex flex-row justify-center items-center px-4 lg:px-4 py-1 focus:outline-none`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : ` Submit`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
