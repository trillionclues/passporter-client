"use client";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import Navbar from "@/components/Header/Navbar";
import { FiArrowRight } from "react-icons/fi";
import FormHeader from "@/components/Header/FormHeader";
import {
  clearPasswordError,
  setError,
  setSubmitting,
} from "@/redux/features/forgotPasswordSlice";
import Link from "next/link";
import { forgetPasswordService } from "@/redux/actions/authActions/forgotpassword.service";
import { useRouter } from "next/navigation";
import Loader from "@/components/Reusables/Loader";
import CheckEmailNotif from "@/components/Auth/checkEmailNotif";

const page = () => {
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { submitting, error, emailSent } = forgotPasswordState;
  const [userEmail, setUserEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleForgotPasswordToken = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      validationSchema.parse({ email: userEmail });
      dispatch(setSubmitting(true));
      const response = await forgetPasswordService(userEmail, dispatch);

      if (response === true) {
        dispatch(setSubmitting(false));
        dispatch(setError(""));
        setUserEmail("");
      } else if (response === false) {
        dispatch(setSubmitting(false));
        dispatch(setError("An error occurred. Please try again."));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: any = {
          email: error.issues[0].message,
        };
        setError(validationErrors);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    if (error && userEmail) {
      dispatch(clearPasswordError());
    }
  }, [userEmail]);

  return (
    <>
      {emailSent ? (
        <>
          <Navbar />
          <div className="flex flex-col items-center justify-center h-full mt-8">
            <FormHeader
              headerText="Check Your Email!"
              paraText="We've sent a reset link to your email. Please check your inbox and
              follow the instructions to reset your password."
              className="text-sm font-medium text-[#0d7836] text-center w-9/12 md:w-1/4"
            />
            <CheckEmailNotif userEmail={userEmail} />
          </div>
        </>
      ) : (
        <>
          <Navbar />

          <div className="flex flex-col items-center justify-center h-full mt-8">
            <FormHeader
              headerText="Recover Your Password"
              paraText="Forgotten your password? Enter the last email your remember and let's get back your account!"
              className="text-sm font-medium text-[#0d7836] text-center w-9/12 md:w-1/4"
            />

            <form
              method="POST"
              onSubmit={handleForgotPasswordToken}
              className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
        px-6 pt-6 pb-8 mb-4 shadow-md"
            >
              {error && (
                <div className="text-red-500 text-center text-sm">
                  {error.message}
                </div>
              )}
              <div className="flex flex-col justify-start items-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 pb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="border text-sm border-grey-light w-full p-3 rounded-md mb-4"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <hr className="flex-grow w-full py-2 w-full" />

              <button
                type="submit"
                className={`${
                  submitting
                    ? "cursor-not-allowed loading"
                    : "bg-[#0d7836] cursor-pointer hover:bg-teal"
                } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none`}
                disabled={submitting}
              >
                {submitting ? (
                  <Loader />
                ) : (
                  <div className="flex flex-row justify-center items-center gap-2">
                    Submit <FiArrowRight className="font-medium text-lg" />
                  </div>
                )}
              </button>
            </form>
            <p className="mt-4 text-[#072F5F] text-[16px]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#0d7836]">
                Sign up
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default page;
