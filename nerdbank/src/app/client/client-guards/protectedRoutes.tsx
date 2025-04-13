"use client";
import { useRouter,usePathname} from 'next/navigation';
import { useAuthStatus } from '../client-guards/fetchAuthStatus';
import { useEffect ,useMemo,ReactNode} from 'react';



interface AuthGuardProps {
     children : ReactNode
    }
const AuthGuard = ({ children} : AuthGuardProps) => {
    const router = useRouter();
    const pathname = usePathname()
    const { data, isLoading, isError } = useAuthStatus();
    console.log('router path name',pathname)


    useEffect(() => {
        console.log('Auth Status:', data, isError);

        if (!isLoading && (!data?.userInfo)) {
              // window.location.href = "/dashboard";
             router.push('/auth-login');  // Use replace to prevent back navigation
        }
    }, [isLoading, isError, router,data?.userInfo]);

    if (isLoading) return <div className="d-flex justify-content-center align-items-center h-100">
      <div id="preloader">
        <div data-loader="dual-ring"></div>
      </div></div>;

    // Prevent rendering protected content before redirect
    if (!data?.userInfo) return null;

    return children;
};


export default AuthGuard;
