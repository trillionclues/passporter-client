"use client";
import CustomButton from "@/components/Reusables/CustomButton";
import { FiArrowRight } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import * as nigerianStates from "nigerian-states-and-lgas";
import { getOfficeForState } from "@/utils/states-and-lga";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { setFormData, setStep } from "@/redux/features/applicationSlice";
import { z, ZodError } from "zod";

const StepTwo = () => {
  const formData =
    useSelector((state: RootState) => state.applicationForm.formData) ?? {};
  const [processingState, setProcessingState] = useState<string[]>([]);
  const [processingOffice, setProcessingOffice] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [validity, setValidity] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const FormDataSchema = z.object({
    processingState: z.string().optional(),
    processingOffice: z.string().optional(),
    validity: z.string().optional(),
  });

  useEffect(() => {
    const statesList = nigerianStates.states();
    setProcessingState(statesList);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const offices = getOfficeForState(selectedState);
      setProcessingOffice(offices);
    }
  }, [selectedState]);

  useEffect(() => {
    setSelectedState(formData.processingState ?? "");
    setSelectedOffice(formData.processingOffice ?? "");
    setValidity(formData.validity ?? "");
  }, [formData]);

  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(1));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      FormDataSchema.parse({
        processingState: selectedState,
        processingOffice: selectedOffice,
        validity,
      });

      dispatch(setStep(3));
      dispatch(
        setFormData({
          processingState: selectedState,
          processingOffice: selectedOffice,
          validity,
        } as {})
      );
      setValidationError(null);
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(
          error.errors[0]?.message || "Validation error occurred"
        );
      }
    }
  };

  const handleSelectedStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedState(e.target.value);
    setValidationError(null);
  };

  const handleSelectedOfficeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOffice(e.target.value);
    setValidationError(null);
  };

  const handleValidityPeriodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValidity(e.target.value);
    setValidationError(null);
  };

  return (
    <div className="h-full w-full flex items-start flex-col bg-white rounded-lg mb-10">
      <h2 className="text-2xl font-bold leading-9 text-[#0d7836] pb-4">
        Processing Details
      </h2>
      <p className="font-normal text-base leading-6 text-gray-600 items-center mb-10">
        Please provide details for processing your application.
      </p>
      {/* display zod error */}
      {validationError && <p className="text-red-500">{validationError}</p>}

      <form className="w-full h-full flex flex-col justify-between gap-4">
        <fieldset className="border-transparent gap-4 flex flex-col pb-4">
          <div className="flex flex-col w-full">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-600"
            >
              Processing State
            </label>
            <select
              id="state"
              name="state"
              className="border p-2 rounded-md w-full"
              value={selectedState}
              onChange={handleSelectedStateChange}
            >
              <option value="">--Please choose a state--</option>
              {processingState.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Select Processing Office */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="office"
              className="text-sm font-medium text-gray-600"
            >
              Processing Office
            </label>
            <select
              id="office"
              name="office"
              className="border p-2 rounded-md w-full"
              value={selectedOffice}
              onChange={handleSelectedOfficeChange}
            >
              <option value="">--Please choose an office--</option>
              {processingOffice.map((office, index) => (
                <option key={index} value={office}>
                  {office}
                </option>
              ))}
            </select>
          </div>
          {/* Select Validity Period */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="validity"
              className="text-sm font-medium text-gray-600"
            >
              Validity Period
            </label>
            <select
              id="validity"
              name="validity"
              className="border p-2 rounded-md w-full"
              value={validity}
              onChange={handleValidityPeriodChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="5years">5 Years</option>
              <option value="10years">10 Years</option>
              <option value="15years">15 Years</option>
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

export default StepTwo;
