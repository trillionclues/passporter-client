"use client";
import React, { useEffect } from "react";
import StepOne from "./Form/Step-1";
import StepTwo from "./Form/Step-2";
import StepThree from "./Form/Step-3";
import StepFour from "./Form/Step-4";
import { NewApplicationNav } from "@/utils/create-application-nav";
import ThankYou from "./Form/ThankYou";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { resetFormData } from "@/redux/features/applicationSlice";

const ApplicationForm = () => {
  const { currentStep, submitted } = useSelector(
    (state: RootState) => state.applicationForm
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (submitted) {
      const redirectTimeout = setTimeout(() => {
        dispatch(resetFormData());
        router.push("/dashboard");
      }, 3000);

      return () => {
        clearTimeout(redirectTimeout);
      };
    }
  }, [submitted, router, dispatch]);
  return (
    <>
      <article className="w-full h-full flex flex-col md:flex-row md:gap-10 gap-5 md:px-10 px-5 justify-center mt-5">
        {submitted ? (
          <ThankYou />
        ) : (
          <>
            <section className="flex flex-row md:flex-col bg-gray-100 bg-cover rounded-lg items-center justify-center md:w-[200px] md:items-start py-6 px-8 gap-5 h-full md:h-auto">
              {NewApplicationNav.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center bg-transparent rounded-full w-5 h-5 p-5 md:p-3 font-bold text-lg text-primary ${
                      currentStep === item.step
                        ? "border-2 border-[#0d7836]"
                        : ""
                    }`}
                  >
                    {item.step}
                  </div>
                  <p
                    className={`text-sm hidden md:block ${
                      currentStep === item.step
                        ? "text-[#0d7836]"
                        : "text-gray-400"
                    } 
              `}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </section>
            <div className="w-full px-5 md:w-1/2 h-full rounded-lg">
              {currentStep === 1 && <StepOne />}
              {currentStep === 2 && <StepTwo />}
              {currentStep === 3 && <StepThree />}
              {currentStep === 4 && <StepFour />}
              {currentStep === 5 && <ThankYou />}
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default ApplicationForm;
