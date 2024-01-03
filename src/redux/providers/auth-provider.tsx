"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
