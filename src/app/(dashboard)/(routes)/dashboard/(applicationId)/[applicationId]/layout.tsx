"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import MobileMenu from "@/components/Dashboard/SidebarMenu/MobileMenu";
import Sidebar from "@/components/Dashboard/SidebarMenu/Sidebar";
import { logoutService } from "@/redux/actions/authActions/logout.service";

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    await logoutService(dispatch);
    router.push("/login");
  };

  useEffect(() => {
    const closeMobileMenuOnResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", closeMobileMenuOnResize);
    return () => {
      window.removeEventListener("resize", closeMobileMenuOnResize);
    };
  }, []);

  return (
    <main className="flex flex-col h-screen max-h-screen">
      <header className="flex justify-between items-center px-4 md:px-8 py-4 bg-white text-black">
        <div
          className="cursor-pointer text-3xl text-[#072F5F] md:hidden"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <GrClose /> : <HiOutlineMenuAlt2 />}
        </div>
        <div
          className="ml-auto gap-2 flex items-center cursor-pointer text-base md:text-sm text-[#072F5F]"
          onClick={handleLogout}
        >
          <TbLogout2 className="text-xl" />
          <p>Sign out</p>
        </div>
      </header>
      <hr className="border-b-8 border-[#0d7836]" />
      <section className="flex flex-row flex-1">
        <aside className="w-1/4 bg-white hidden md:block">
          <Sidebar />
        </aside>
        <aside
          className={`md:hidden fixed top-[58px] left-[90px] right-0 bg-white bottom-0 transition-all duration-500 ease-in-out delay-150 transform overflow-hidden ${
            sidebarOpen
              ? "translate-x-0 z-50 md:z-60 lg:z-70"
              : "translate-x-[100%] origin-right"
          }`}
        >
          <MobileMenu />
        </aside>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </section>
    </main>
  );
};

export default ApplicationLayout;
