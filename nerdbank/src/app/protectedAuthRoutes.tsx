"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStatus } from "./fetchAuthStatus";
import { useEffect, useMemo, ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}
const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError } = useAuthStatus();
  console.log("router path name", pathname);

  useEffect(() => {
    console.log("Auth Status :", data, isError, isLoading);
    if (!isLoading && data?.userInfo) {
      const { isAdmin }: any = data?.userInfo.message;
      isAdmin
        ? router.push("/admin/dashboard")
        : router.push("client/dashboard");
      console.log("userInfo info is", data?.userInfo);
    }
  }, [data?.userInfo]);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      </div>
    );

  // Prevent rendering protected content before redirect
  if (data?.userInfo) return null;

  return children;
};

export default AuthGuard;
