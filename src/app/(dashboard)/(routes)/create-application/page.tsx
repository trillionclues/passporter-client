"use client";
import ApplicationForm from "@/components/Application/ApplicationForm";
import { logout } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";

const CreateApplcation = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto h-full flex flex-col">
      <div className="py-3 flex justify-between items-center md:px-10 px-5">
        <Link href="/">
          <Image
            src="/images/nis-logo.png"
            alt="passporter logo"
            className="object-contain w-24 lg:w-32"
            width={96}
            height={128}
          />
        </Link>
        <div
          className="flex items-center cursor-pointer hover:opacity-50 gap-2"
          onClick={handleLogout}
        >
          <TbLogout2 className="text-lg lg:text-xl" />
          <p className="text-[#0d7836] font-medium text-sm lg:text-lg">
            Sign out
          </p>
        </div>
      </div>
      <hr className="border-b-8 border-[#0d7836]" />

      <div className="h-[calc(100vh-150px)] w-full flex items-start flex-col pb-10">
        <h2 className="md:text-xl text-md text-primary md:font-bold font-medium md:px-10 px-5 py-3">
          Please fill the forms to start your Application
        </h2>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default CreateApplcation;
