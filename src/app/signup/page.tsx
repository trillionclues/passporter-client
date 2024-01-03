"use client";

import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { signUpService } from "@/redux/actions/authActions/signup.service";
import FormHeader from "@/components/Header/FormHeader";
import { FormDataProps } from "@/types/FormData";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Header/Navbar";
import { CustomForm } from "@/components/Form/CustomForm";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleCreateNewUser = async (formData: FormDataProps) => {
    const newUserData = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      email: formData?.email,
      password: formData?.password,
    };

    try {
      const response = await signUpService(newUserData, dispatch);

      if (response === true) {
        router.push("/login");
      } else if (response === false) {
        console.log("Server error:", authError?.message);
      } else if (typeof response === "string") {
        console.log("Server error:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full mt-8">
        <FormHeader
          headerText="Register Passporter"
          paraText="Create your account by filling in the details below"
          className="text-sm font-medium text-[#0d7836]"
        />
        <CustomForm
          isRegistration={true}
          handleFormSubmit={handleCreateNewUser}
          formError={authError}
          method="POST"
        />
      </div>
    </>
  );
};

export default SignUp;
