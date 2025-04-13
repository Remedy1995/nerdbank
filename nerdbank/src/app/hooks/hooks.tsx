import { fetchGetUserInformation } from "../../../bankapi/bankapiComponents";
import { fetchGetSingleAccount } from "../../../bankapi/bankapiComponents";
import {useState,useCallback ,useEffect} from 'react';
import { useQuery } from "@tanstack/react-query";
import { useRouter} from "next/navigation";

  type ApiResponse = {
    message: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string
    }
  }
  type AccountResponse = {
    message: {
     accountBalance : number
    }
  }

export default function UserHooks() {

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
      console.log('mine result',result)
      return result;
    },
  });

  const { data: userAccount } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: async () => {
      const account = await fetchGetSingleAccount({});
        console.log('mine result',account)
      if (!account) {
        //fallback
        return {
          account : { accountBalance : 0 }
        };
      }
      return account;
    },
  });
    console.log('userAccount data is',userInfo)
  return {userAccount,userInfo}
}


export const HandleLogout = () => {

 const [logout, setLogout] = useState(0);

  const router = useRouter()
  const Logout = useCallback(async () => {
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`,
         { method: "POST",
        headers: {
          "Content-Type": "application/json",  // ✅ Ensure JSON format
        }
    });

      if (!response.ok) {
        throw new Error("Sorry, an error occurred");
      }

      const data = await response.json();
      console.log("This is the response", data);

      if (data?.statusCode) {
        setLogout(data.statusCode);
      }
    } catch (error) {
      console.error("This is the error", error);
    }
  }, []);

  useEffect(() => {
    if (logout) {
      router.push("/");
    }
  }, [logout, router]);

  return { Logout }

  }



  export const VerifyPin = ( pinObject: Record<string,string>) => {
    const router = useRouter()
    const [message , setMessage] = useState("dummy message");
    const [visible, setVisible] = useState(false);
   

     const Verify = async () => {
       console.log(Object.values(pinObject))
       if(Object.values(pinObject)[0] === ''){
         setMessage("Bank Pin fields cannot be empty or invalid")
         setVisible(true)
         return;
       }
       try {
         setMessage("")
         const response : any = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/pin/verify-bank-pin`,
            { method: "POST",
           headers: {
             "Content-Type": "application/json",  // ✅ Ensure JSON format
           },
           body : JSON.stringify(pinObject)
       });
   
        
          
         const data = await response.json();
         if (!response.ok) {
            console.log(data)
            if(data.status === 401){
              //unauthorised bring user to signup screen
              router.push('/')
              return;
            }
            setVisible(true)
            setMessage(data.message)
            return;
         }
         console.log("This is the response", data);
   
         if (data) {
           setMessage(data.status);
           setVisible(true)
           return;
         }
       } catch (error : any) {
         console.error("This is the error", error);
         setMessage(error.message)
         setVisible(true)
       }
     }
   
   
     return { Verify,message,setMessage,visible,setVisible}
   
     }