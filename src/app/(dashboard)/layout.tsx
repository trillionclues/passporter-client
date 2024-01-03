"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface MainDashboardLayoutProps {
  children: React.ReactNode;
}

const MainDashboardLayout: React.FC<MainDashboardLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rawData = Cookies.get("sessionData");
      const data = JSON.parse(rawData || "{}");

      if (Object.keys(data).length > 0) {
        const protectedRoutes = [
          "/dashboard/profile",
          "/dashboard",
          "/create-application",
        ];
        const isProtectedRoute = protectedRoutes.some((route) =>
          window.location.pathname.startsWith(route)
        );

        if (!isProtectedRoute) {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <main>
      <div>{children}</div>
    </main>
  );
};

export default MainDashboardLayout;
