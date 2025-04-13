"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStatus } from "../admin-guards/fetchAuthStatus";
import { useEffect, ReactNode } from "react";
import { useMessageStore } from "@/app/store/useStore";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const { data, isLoading, isError }: any = useAuthStatus();
  const { message } = useMessageStore();

  useEffect(() => {
    console.log("Auth Status:", data, isError, isLoading);

    if (!isLoading && data?.userInfo?.message) {
      const { isAdmin } = data?.userInfo?.message; // ✅ Correctly accessing isAdmin
      console.log("isAdmin:", isAdmin, message);

      if (!isAdmin) {
        router.push("/unauthorised");
      } 
      
      else if (
        pathname.split("/").includes("confirm-transfer") &&
        message !== "confirmed"
      ) {
        router.push("/unauthorised");
      }
    }
  }, [data, isLoading, router]);

  // ✅ Show loader while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      </div>
    );
  }

  // ✅ If user is NOT an admin, prevent rendering
  if (
    !data?.userInfo?.message?.isAdmin
  ) {
    return null;
  }
  else if(pathname.split("/").includes("confirm-transfer") &&
  message !== "confirmed"){
    return null;
  }
  return children;
};

export default AuthGuard;
