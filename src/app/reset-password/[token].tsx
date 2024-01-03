"use client";

import { useSearchParams } from "next/navigation";

const resetPasswordParams = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return token;
};

export default resetPasswordParams;
