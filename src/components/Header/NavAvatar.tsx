"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { FaCaretDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import CustomButton from "../Reusables/CustomButton";
import { NavAvatarProps } from "@/types/NavAvatarProps";
import Cookies from "js-cookie";

type Route = "login" | "register" | "profile";

const routes: { [key in Route]: string } = {
  login: "/login",
  register: "/signup",
  profile: "/dashboard/profile",
};

const NavAvatar: React.FC<NavAvatarProps> = ({
  scrolled,
  toggleMenu,
  mobileMenuOpen,
}) => {
  const { userData } = useSelector((state: RootState) => state.userData);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropDown, setIsDropDown] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDropdownToggle = () => {
    setIsDropDown(!isDropDown);
  };

  const handleLogout = async () => {
    dispatch(logout());
    router.push(routes.login);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target)
    ) {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const rawData = Cookies.get("sessionData");
  //     const data = JSON.parse(rawData || "{}");

  //     if (Object.keys(data).length > 0) {

  //     }
  //   }
  // }, [router]);

  return (
    <div className="flex flex-row justify-between items-center gap-2">
      {userData ? (
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <Image
              src={
                userData?.getApplicant.profilePicture || "/images/nis-logo.png"
              }
              alt="Profile Avatar"
              width={30}
              height={30}
              className="object-cover rounded-full border border-gray-300"
            />
            <span
              className={`hidden md:block ml-2 text-md font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              Welcome, {userData?.getApplicant.firstname}!
            </span>
            <FaCaretDown
              className={`ml-1 transition-transform duration-300 ${
                isDropDown ? "rotate-180" : ""
              } ${scrolled ? "text-white" : "text-gray-700"}`}
            />
          </div>
          {isDropDown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // Display login button when not logged in
        <CustomButton
          text="Login"
          href="/passport"
          className="flex flex-row justify-center items-center gap-3 bg-[#0d7836] text-white py-1 px-3 rounded-md hover:bg-gray-500 w-18 md:w-28"
          onClick={() => router.push("/login")}
        />
      )}

      <button
        className="md:hidden text-2xl cursor-pointer ml-3 z-50"
        onClick={toggleMenu}
      >
        {mobileMenuOpen ? (
          <AiOutlineClose
            className={`text-3xl ${scrolled ? "text-white" : ""}`}
          />
        ) : (
          <AiOutlineMenu
            className={`text-3xl ${scrolled ? "text-white" : ""}`}
          />
        )}
      </button>
    </div>
  );
};

export default NavAvatar;
