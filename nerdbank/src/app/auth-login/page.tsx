"use client"

import { Input } from "../components/ui/input"
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useLoginUser } from "../../../bankapi/bankapiComponents";
import { useRouter } from "next/navigation";
import { useState,useEffect,useMemo } from "react"
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useStore";
import {SyncLoader} from 'react-spinners';
import React from 'react';


export default function AuthSignIn() {

   const router = useRouter()
   const {setAuth,auth }= useAuthStore();
   const [userInfo,setUserInfo] = useState([])
  const [showMessage, setShowMessage] = useState("")
  const FormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(2, { message: "password must be at least 2 characters." }),
  });

  // initialise the zod form to collect email and password
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //helper function to dispatch data to the api 

  const { mutate: loginUser, status, isError, isSuccess } = useLoginUser({

     
    onSuccess: (data) => {

 const parseData = Object.values(data)
  .filter((val) => typeof val === 'object' && val !== null) // ✅ Ensure val is an object
  .flatMap((val) => (val as any)?.userData || []); // ✅ Use optional chaining and default to []
console.log('userAccount', parseData);
if (parseData.length > 0) {
  setAuth(parseData[0]?.user); // ✅ Safely set auth if data exists
}
console.log('pushed to store', auth);


          if(parseData[0]?.isAdmin){
              router.push('/admin/dashboard')
              }
          else {
               router.push('/client/dashboard')
              }
          // router.replace('/dashboard')

      //window.location.href = "/dashboard";
    },
    onError: (error) => {
      console.log('The data', status, isError, isSuccess)
      console.log(Object.values(error).slice(1, 2).toString())
      setShowMessage(Object.values(error)[2]['message'])
    }
  })



  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setShowMessage("")
    //push the email and password to the login Hook
    console.log(data)
    loginUser({
      body: data
    })
  }

  return (<div id="main-wrapper overflow-none">
    <div id="content">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
            <div className="bg-white shadow-md rounded p-3 pt-sm-4 pb-sm-5 px-sm-5">
              <h3 className="fw-500 text-center text-primary">Nerd Bank</h3>
              <hr className="mx-n3 mx-sm-n5" />
              {showMessage ? <p className="text-3 text-danger font-bold text-center mb-0">{showMessage}</p> : status === 'idle' && (<p className="lead text-center">We are glad to see you again!</p>)}
             
               <p className="text-4 font-bold text-start text-primary mb-1">Please Sign in to continue</p>
              {/* <form id="loginForm" method="post">
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label">Email Address</label>
                <Input type="email" className="form-control" id="emailAddress" required placeholder="Enter Your Email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" required placeholder="Enter Password"/>
              </div>
              <div className="row mb-3">
                  <div className="col-sm">
                    <div className="form-check form-check-inline">
                      <Input className="form-check-input" id="remember-me" name="remember" type="checkbox"/>
                      <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
                    </div>
                  </div>
                  <div className="col-sm text-end"><a className="btn-link" href="#">Forgot Password ?</a></div>
                </div>
              <div className="d-grid mb-3"><button className="btn btn-primary" type="submit">Sign In</button></div>
            </form>
            <p className="text-3 text-muted text-center mb-0">Don't have an account? <a className="btn-link" href="signup-3.html">Sign Up</a></p> */}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="mb-3">
                        <FormItem>
                          <FormLabel className="form-label">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Please provide your email"  {...field} id="emailAddress"
                              className="form-control py-2" />
                          </FormControl>

                          <FormMessage className="text-danger p-1" />
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <div className="mb-3">
                        <FormItem>
                          <FormLabel className="form-label">Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Please provide your password" {...field} id="loginPassword"
                              className="form-control py-2" />
                          </FormControl>

                          <FormMessage className="text-danger p-1" />
                        </FormItem>
                      </div>
                    )}
                  />


                  {/*<div className="form-check form-check-inline">
                      <Input className="form-check-input" id="remember-me" name="remember" type="checkbox"/>
                      <FormLabel className="form-check-label" htmlFor="remember-me">Remember Me</FormLabel>
                    </div>

                  <div className="col-sm text-end mb-3"><a className="btn-link" href="#">Forgot Password ?</a></div>*/}


                  <div className="d-grid mb-3">
                    <Button className="btn btn-primary" type="submit" disabled={status ==="pending"}> 
                      {status==='pending'?<SyncLoader color="#FFFFFF" size={10}/> : "Submit"}
                      </Button>
                  </div>
                </form>
              </Form>
              {/* <p className="text-3 text-muted text-center mb-0">Don&apos;t have an account? <a className="btn-link" href="signup-3.html">Sign Up</a></p> */}
              <p className="text-3 text-muted text-center mb-0">2025 NerdBank. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>

  )
}