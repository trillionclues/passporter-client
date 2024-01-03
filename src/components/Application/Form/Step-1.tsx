"use client";
import CustomButton from "@/components/Reusables/CustomButton";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormProgress } from "@/types/FormProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { setFormData, setStep } from "@/redux/features/applicationSlice";
import { z, ZodError } from "zod";

const StepOne: React.FC = () => {
  const formData =
    useSelector((state: RootState) => state.applicationForm.formData) ?? {};
  const [selectedApplicationType, setSelectedApplicationType] = useState<
    string | null
  >(null);
  const dispatch = useDispatch<AppDispatch>();

  const applicationTypeSchema = z
    .string()
    .refine((value) => ["Passport", "Visa"].includes(value), {
      message: "Please select an application type!",
    });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      applicationTypeSchema.safeParse(selectedApplicationType);
      dispatch(
        setFormData({ applicationType: selectedApplicationType } as any)
      );
      dispatch(setStep(2));
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          console.log(err);
        });
      }
    }
  };

  const handleChangeApplicationType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedApplicationType(e.target.value);
  };

  useEffect(() => {
    setSelectedApplicationType(formData.applicationType ?? "");
  }, [formData]);

  return (
    <div className="h-full w-full flex items-start flex-col bg-white rounded-lg mb-10">
      <h2 className="text-2xl font-bold leading-9 text-[#0d7836] pb-4">
        Select your Application Type
      </h2>
      <p className="font-normal text-base leading-6 text-gray-600 items-center mb-10">
        You can apply for a Passport or Visa.
      </p>

      <form className="w-full h-full flex flex-col justify-between gap-4">
        <fieldset className="border-transparent">
          <section className="flex flex-col md:flex-row gap-4">
            <label
              htmlFor="passport"
              className={`flex flex-col justify-center items-center gap-2 border ${
                selectedApplicationType === "Passport"
                  ? "border-2 border-blue-500"
                  : "border-green-500"
              } rounded-md p-4 cursor-pointer hover:border-blue-500 max-w-56 w-[100%]`}
              aria-label="choose passport plan"
            >
              <img
                src="/images/icon-arcade.svg"
                alt=""
                className="w-10 h-10"
                aria-hidden="true"
              />

              <p className="font-medium text-base text-blue-500">Passport</p>
              <input
                className="hidden"
                type="radio"
                name="applicationType"
                id="passport"
                value="Passport"
                onChange={handleChangeApplicationType}
              />
            </label>

            <label
              htmlFor="visa"
              className={`flex flex-col items-center justify-center gap-2 border ${
                selectedApplicationType === "Visa"
                  ? "border-2 border-blue-500"
                  : "border-green-500"
              } rounded-md p-4 cursor-pointer hover:border-blue-500 max-w-56 w-[100%]`}
              aria-label="choose visa plan"
            >
              <img
                src="/images/icon-advanced.svg"
                alt=""
                className="w-10 h-10"
                aria-hidden="true"
              />

              <p className="font-medium text-base text-blue-500">Visa</p>
              <input
                className="hidden"
                type="radio"
                name="applicationType"
                id="visa"
                value="Visa"
                onChange={handleChangeApplicationType}
              />
            </label>
          </section>
        </fieldset>
        <div className="w-full flex justify-between items-end py-6">
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

export default StepOne;
