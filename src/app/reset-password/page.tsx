"use client";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "@/components/Header/Navbar";
import { FiArrowRight } from "react-icons/fi";
import FormHeader from "@/components/Header/FormHeader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  clearPasswordError,
  setError,
  setSubmitting,
} from "@/redux/features/forgotPasswordSlice";
import { resetPasswordService } from "@/redux/actions/authActions/resetpassword.service";
import Loader from "@/components/Reusables/Loader";
import resetPasswordParams from "./[token]";

const page = () => {
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { submitting, error } = forgotPasswordState;
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = resetPasswordParams();

  const passwordSchema: any = z.object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    try {
      // check if token exist before sending new password req
      passwordSchema.parse({ password: newPassword });
      dispatch(setSubmitting(true));
      const response = await resetPasswordService(newPassword, dispatch);

      if (response === true) {
        dispatch(setSubmitting(false));
        dispatch(setError(""));
        setNewPassword("");
        router.push("/login");
      } else if (response === false) {
        dispatch(setSubmitting(false));
        dispatch(setError("An error occurred. Please try again."));
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationErrors: any = {
          email: error.issues[0].message,
        };
        setError(validationErrors);
      } else {
        console.error(error);
        dispatch(setSubmitting(false));
      }
    }
  };
  useEffect(() => {
    if (error && newPassword) {
      dispatch(clearPasswordError());
    }
  }, [newPassword]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-full mt-8">
        <FormHeader
          headerText="Change Your Password"
          paraText="Enter your new password and we will get you into your account immediately."
          className="text-sm font-medium text-[#0d7836] text-center w-9/12 md:w-1/4"
        />

        <form
          method="PUT"
          onSubmit={handleChangePassword}
          className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
        px-6 pt-6 pb-8 mb-4 shadow-md"
        >
          {error && (
            <div className="text-red-500 text-center text-sm">
              {error.message}
            </div>
          )}
          <div className="relative rounded-full mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              Enter new password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="border text-sm border-grey-light w-full p-3 rounded-md pr-12"
              placeholder="Enter your password"
              value={newPassword}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <button
                type="button"
                className="absolute -top-[90px] md:-top-[105px] right-0 mt-[55px] md:mt-[73px] mr-4"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <BsEyeSlash className="text-xl" />
                ) : (
                  <BsEye className="text-xl" />
                )}
              </button>
            </div>
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
      </div>
    </>
  );
};

export default page;
