"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rawData = Cookies.get("sessionData");
      const data = JSON.parse(rawData || "{}");

      if (Object.keys(data).length > 0) {
        const protectedRoutes = ["/dashboard/profile", "/dashboard"];
        const isProtectedRoute = protectedRoutes.some((route) =>
          window.location.pathname.startsWith(route)
        );

        if (!isProtectedRoute) {
          router.push("/admin-dashboard");
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

export default AdminDashboardLayout;
