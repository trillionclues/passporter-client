"use client";

import { FormDataProps } from "@/types/FormData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import Loader from "../Reusables/Loader";
import { AppDispatch, RootState } from "@/redux/store/store";
import { clearLoginError } from "@/redux/features/authSlice";
import Cookies from "js-cookie";

interface CustomFormProps {
  isRegistration: boolean;
  handleFormSubmit: (formData: FormDataProps) => void;
  method: string;
  formError: any;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  isRegistration,
  handleFormSubmit,
  method,
  formError,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const loadingReq = useSelector((state: RootState) => state.auth.isLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const determineButtonText = () => {
    if (loadingReq) {
      return <Loader />;
    } else {
      if (step === 1 && isRegistration) {
        return (
          <div className="flex flex-row justify-center items-center gap-2">
            Next <FiArrowRight className="font-medium text-lg" />
          </div>
        );
      } else if (isRegistration) {
        return (
          <div className="flex flex-row justify-center items-center gap-2">
            Register <FiArrowRight className="font-medium text-lg" />
          </div>
        );
      } else {
        return (
          <div className="flex flex-row justify-center items-center gap-2">
            Login <FiArrowRight className="font-medium text-lg" />
          </div>
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle rememeber me checkbox
  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loadingReq) {
      return;
    }

    if (rememberMe) {
      Cookies.set("rememberedEmail", formData.email);
    }

    try {
      if (step === 1 && isRegistration) {
        setStep(2);
      } else if (step === 2) {
        if (typeof handleFormSubmit === "function") {
          await handleFormSubmit(formData);
        }
      } else {
        if (typeof handleFormSubmit === "function") {
          handleFormSubmit(formData);
        }
      }
    } catch (error) {
      console.log(error as string);
    }
  };

  useEffect(() => {
    if (
      formError &&
      (formData.email ||
        formData.password ||
        formData.firstname ||
        formData.lastname)
    ) {
      dispatch(clearLoginError());
    }
  }, [formData]);

  return (
    <>
      <form
        method={method}
        onSubmit={handleSubmit}
        className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
        px-6 pt-6 pb-8 mb-4 shadow-md"
      >
        {formError && (
          <div className="text-red-500 text-center text-sm">
            {formError.message}
          </div>
        )}
        {step === 1 && (
          <>
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
                value={formData?.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative rounded-full mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 pb-1"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="border text-sm border-grey-light w-full p-3 rounded-md pr-12"
                placeholder="Enter your password"
                value={formData?.password}
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
            <div className="mb-4 flex justify-between">
              <label
                htmlFor="rememberMe"
                className="flex items-center text-sm font-medium text-gray-600"
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Remember Me
              </label>
              <Link
                href="/forgot-password"
                className="text-[#0d7836] text-sm font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </>
        )}

        {step === 2 && isRegistration && (
          <>
            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-600 pb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                className="border text-sm border-grey-light w-full p-3 rounded-md mb-4"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-600 pb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                className="border text-sm border-grey-light w-full p-3 rounded-md mb-4"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <hr className="flex-grow w-full py-2 w-full" />

        <button
          type="submit"
          className={`${
            loadingReq
              ? "cursor-not-allowed loading"
              : "bg-[#0d7836] cursor-pointer hover:bg-teal"
          } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none`}
          disabled={loadingReq}
        >
          {loadingReq && step !== 2 ? <Loader /> : determineButtonText()}
        </button>
      </form>
      {isRegistration ? (
        <>
          <div className="w-full max-w-sm md:max-w-2xl px-6 mt-2 pb-5 text-center flex flex-col justify-center items-center gap-1">
            <p>By clicking sign up, you accept Passporter’s Terms of service</p>
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-[#0d7836]">
                Log in
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-[#072F5F] text-[16px]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#0d7836]">
              Sign up
            </Link>
          </p>
        </>
      )}
    </>
  );
};
