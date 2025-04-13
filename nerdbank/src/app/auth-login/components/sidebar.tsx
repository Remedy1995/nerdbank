"use client";
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { fetchGetUserInformation } from "../../../../bankapi/bankapiComponents";
import { fetchGetSingleAccount } from "../../../../bankapi/bankapiComponents";
import React from "react";



export default function Sidebar() {
console.log('hello world')
const [user,setUser] = React.useState([])

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


  const { message } = userInfo || {}

  React.useEffect(()=> {
        console.log('running in the hook')
        console.log('my message',message)
      },[message])

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

 type UserAccountType = {
  account?: { accountBalance: number; accountNumber?: string };
} | never[]; // Ensure TypeScript understands the possible types

const userAccountData: UserAccountType = userAccount || [];
const data = Array.isArray(userAccountData) ? null : userAccountData;
const AccountNumber = typeof data?.account?.accountNumber === 'string' ? data.account.accountNumber : "";
const SliceAccountNumber = AccountNumber.slice(-5);
const padAccountNumber = SliceAccountNumber.padStart(AccountNumber.length || 5, "X");




  return (
    <aside className="col-lg-3">
      <div className="bg-white shadow-sm rounded text-center p-3 mb-4">
        <div className="profile-thumb mt-3 mb-4">
          <Image className="rounded-circle" src="/images/avatar-user-icon-vector_97886-15026.avif" alt="" width={70} height={70} />
          <div className="profile-thumb-edit bg-primary text-white" data-bs-toggle="tooltip" title="Change Profile Picture">
            <i className="fas fa-camera position-absolute"></i>
            <input type="file" className="custom-file-input" id="customFile" />
          </div>
        </div>
        <p className="text-3 fw-500 mb-2">Hello, {message?.firstname} {message?.lastname}</p>
        <p className="mb-2">
          <a href="settings-profile.html" className="text-5 text-light" data-bs-toggle="tooltip" title="Edit Profile">
            <i className="fas fa-edit"></i>
          </a>
        </p>
      </div>
      <div className="bg-white shadow-sm rounded text-center p-3 mb-4">
        <div className="text-17 text-light my-3">
          <i className="fas fa-wallet"></i>
        </div>
        <h3 className="text-2 fw-400">{padAccountNumber}</h3>
        <p className="mb-2 text-muted opacity-8">Account Number</p>
          <h3 className="text-9 fw-400">$ {data?.account?.accountBalance}</h3>
        <p className="mb-2 text-muted opacity-8">Available Balance</p>
        <hr className="mx-n3" />
        <div className="d-flex">
          <a href="withdraw-money.html" className="btn-link me-auto">Withdraw</a>
          <a href="deposit-money.html" className="btn-link ms-auto">Deposit</a>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded text-center p-3 mb-4">
        <div className="text-17 text-light my-3">
          <i className="fas fa-comments"></i>
        </div>
        <h3 className="text-5 fw-400 my-4">Need Help?</h3>
        <p className="text-muted opacity-8 mb-4">Have questions or concerns regarding your account?<br />Our experts are here to help!.</p>
        <div className="d-grid">
          <a href="#" className="btn btn-primary">Chat with Us</a>
        </div>
      </div>
    </aside>
  )
}