import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/providers/redux-provider";
import AuthProvider from "@/redux/providers/auth-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passporter",
  description: "One pass to rule them all",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ReduxProvider>
          {/* <AuthProvider> */}
          {children}
          <ToastContainer />
          {/* </AuthProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
