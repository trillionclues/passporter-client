import React from "react";
import { FiCheck } from "react-icons/fi";
import CustomButton from "@/components/Reusables/CustomButton";

const ThankYou = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col bg-white rounded-lg mb-10 w-full">
      <h2 className="text-2xl font-bold leading-9 text-[#0d7836] pb-2">
        Thank you for your application!
      </h2>
      <p className="font-normal text-base leading-6 text-gray-600 mb-6 w-full text-center">
        Your application has been successfully submitted. We will process it as
        soon as possible. You will receive an email notification with the status
        of your application within the next few days.
      </p>
      <CustomButton
        text="Track My Application"
        href="/track"
        className="cursor-pointer font-bold text-sm text-white rounded-md focus:bg-white-500 flex flex-row justify-center items-center bg-[#0d7836] px-4 lg:px-4 py-1"
        icon={<FiCheck className="text-white h-4 w-4" />}
      />
    </div>
  );
};

export default ThankYou;
