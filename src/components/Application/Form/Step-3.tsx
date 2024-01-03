"use client";
import CustomButton from "@/components/Reusables/CustomButton";
import { FiArrowRight } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { setFormData, setStep } from "@/redux/features/applicationSlice";

const StepThree = () => {
  const formData =
    useSelector((state: RootState) => state.applicationForm.formData) ?? {};
  const [selectedBookletType, setSelectedBookletType] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(2));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setStep(4));
      dispatch(setFormData({ bookletType: selectedBookletType } as {}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSelectedBookletType(formData.bookletType ?? "");
  }, [formData]);

  return (
    <div className="h-full w-full flex items-start flex-col bg-white rounded-lg mb-10">
      <h2 className="text-2xl font-bold leading-9 text-[#0d7836] pb-4">
        Booklet Selection
      </h2>
      <p className="font-normal text-base leading-6 text-gray-600 items-center mb-10">
        Please choose the type of booklet you prefer.
      </p>

      <form className="w-full h-full flex flex-col justify-between gap-4">
        <fieldset className="border-transparent">
          <div className="flex flex-col w-full">
            <label
              htmlFor="booklet"
              className="text-sm font-medium text-gray-600 mb-4 "
            >
              Booklet Type
            </label>
            <select
              id="booklet"
              name="booklet"
              className="border p-2 rounded-md w-full"
              value={selectedBookletType}
              onChange={(e) => setSelectedBookletType(e.target.value)}
            >
              <option value="">--Please choose an option--</option>
              <option value="32 Pages">32 Pages</option>
              <option value="64 Pages">64 Pages</option>
            </select>
          </div>
        </fieldset>

        <div className="w-full flex justify-between items-end py-6">
          <CustomButton
            text="Go Back"
            href="/"
            className="cursor-pointer font-bold text-base text-gray-600 rounded-md hover:font-bold focus:text-[#0d7836]"
            onClick={handlePrevStep}
          />
          <CustomButton
            text="Next"
            href=""
            className="cursor-pointer font-bold text-base text-white rounded-md focus:bg-white-500 flex flex-row justify-center items-center bg-[#0d7836] px-4 lg:px-4 py-1"
            icon={<FiArrowRight className="text-white h-4 w-4" />}
            onClick={handleNextStep}
          />
        </div>
      </form>
    </div>
  );
};

export default StepThree;
