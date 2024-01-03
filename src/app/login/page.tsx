"use client";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { loginService } from "../../redux/actions/authActions/login.service";
import { FormDataProps } from "@/types/FormData";
import { useRouter } from "next/navigation";
import { z } from "zod";
import FormHeader from "@/components/Header/FormHeader";
import Navbar from "@/components/Header/Navbar";
import { CustomForm } from "@/components/Form/CustomForm";
import { setUser } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getUserRole } from "@/lib/getUserRole";
import { getUserDetails } from "@/redux/actions/authActions/getUserDetails.service";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const authError = useSelector((state: RootState) => state.auth.error);
  const { userData } = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rawData = Cookies.get("sessionData");
      const data = JSON.parse(rawData || "{}");

      if (Object.keys(data).length > 0) {
        setUser(data);

        const userRole = getUserRole();

        if (userRole === "admin") {
          router.push("/admin-dashboard");
        } else if (userRole === "applicant") {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  const handleLogin = async (formData: FormDataProps) => {
    try {
      loginSchema.parse(formData);

      const response = await loginService(
        { email: formData.email, password: formData.password },
        dispatch
      );

      if (response === true) {
        await getUserDetails(dispatch);

        const userRole = getUserRole();
        if (userRole === "admin") {
          router.push("/admin-dashboard");
        } else if (userRole === "applicant") {
          router.push("/dashboard");
        }

        toast.success("Welcome back!");
      } else if (response === false) {
        console.log("Server error:", authError?.message);
      } else if (typeof response === "string") {
        console.log("Server error:", response);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.issues.forEach((issue) => {
          validationErrors[issue.path[0]] = issue.message;
        });

        // setFormErrors(validationErrors);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-full mt-8">
        <FormHeader
          headerText="Sign In to Passporter"
          paraText="Enter your details to login to your account"
          className="text-sm font-medium text-[#0d7836] text-center"
        />

        <CustomForm
          isRegistration={false}
          handleFormSubmit={handleLogin}
          formError={authError}
          method="POST"
        />
      </div>
    </>
  );
};

export default Login;
