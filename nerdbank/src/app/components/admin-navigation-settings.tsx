
"use client"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { fetchGetUserInformation } from "../../../bankapi/bankapiComponents";
import { HandleLogout  } from "../hooks/hooks";



interface settingsProps {
    firstNav? : boolean,
    secondNav? : boolean,
    thirdNav? : boolean,
    }
export default function NavSettings({firstNav, secondNav, thirdNav} : settingsProps) {

  const {Logout} = HandleLogout()
  type ApiResponse = {
    message: {
      firstname: string | ""
      lastname: string | ""
      phone: string | ""
      email: string | ""
    }
  }

  const { data: userInfo } = useQuery<ApiResponse>({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const result = await fetchGetUserInformation({});

      if (!result) {
        //fallback
        return {
          message: { firstname: "", lastname: "", phone: "", email: "" }
        };
      }
      return result;
    },
  });


  const { message } = userInfo || {}

  
  
  

    return (       
           <div className="bg-primary">
                    <div className="container d-flex justify-content-center">
                        <ul className="nav nav-pills alternate nav-lg border-bottom-0">
                            <li className="nav-item"> <a className={firstNav ? "nav-link active": "nav-link"} href="/admin/user-profile">Account</a></li>
                            <li className="nav-item"> <a className={secondNav ? "nav-link active": "nav-link"} href="/admin/user-settings">Security</a></li>
                            <li className="nav-item"> <a className={thirdNav ? "nav-link active": "nav-link"} href="/admin/payment-methods">Payment Methods</a></li>
                        </ul>
                    </div>
                </div>
    )
}