"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import next from "next";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Register = () => {

  let {register,formState,handleSubmit} = useForm()

  let OtpPopUp = () => {
    const privacyModal = new Modal(window["info-popup"], {
      placement: "center",
    });
    privacyModal.show();
  };

  let {isPending,mutate,isError} = useMutation({
    mutationFn:(data)=>{
      return axios.post("/api/verifyotp", data)
  },
    onSuccess:(response)=>{
      if(response.data.response == "success" ){
        toast.success(response.data.message)
      }
      OtpPopUp()
    },
    onError:(err)=>{
      console.log("Error",err);
      toast.error(err.message)
    }
    }
  )

  let [userAuthData,setuserAuthData] = React.useState()


  let verifyOtpModel = useForm()
  let router = useRouter()

  let verifyOtpPost = useMutation({
    mutationFn:(data)=>{
      return axios.put("/api/verifyotp", data)
    },
    onSuccess:(response)=>{
      const privacyModal = new Modal(window["info-popup"], {
        placement: "center",
      });
      privacyModal.hide();
      if(response.data.response == "success" ){
        toast.success(response.data.message)
        router.replace("/login")
      }

      if(response.data.response == "error"){
        toast.error(response.data.message)
      }
    },
    onError:(err)=>{
      console.log("Error",err);
      toast.error(err.message)
    }
  })
  
  

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Welcome back
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit((event)=>{
                mutate(event)
                setuserAuthData(event)
                
              })}>

<div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    {
                      ...register("username",{
                        required:{
                          value:true,
                          message: "Please enter your username"
                        }
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                  />
                </div>
                <p className="text-red-400">{formState.errors.username?.message}</p>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    {
                      ...register("email",{
                        required:{
                          value:true,
                          message: "Please enter your email"
                        },
                        pattern:{
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <p className="text-red-400">{formState.errors.email?.message}</p>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {
                      ...register("password",{
                        required:{
                          value:true,
                          message: "Please enter your password"
                        }
                      })
                    }
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <p className="text-red-400">{formState.errors.password?.message}</p>

                <button
                type="submit"
                  className="w-full text-white
                       bg-primary-600 hover:bg-primary-700
                        focus:ring-4 focus:outline-none
                         focus:ring-primary-300
                          font-medium rounded-lg text-sm px-5 py-2.5 text-center
                           dark:bg-primary-600 dark:hover:bg-primary-700
                            dark:focus:ring-primary-800"
                >
                  Sign in
                  {isPending && <>
                      <svg aria-hidden="true" className="ms-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                  </>}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link
                    href="/login"
                    className="ms-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div
        id="info-popup"
        tabIndex="-1"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email {userAuthData?.email}</p>
                </div>
              </div>

              <div>
                <form onSubmit={verifyOtpModel.handleSubmit((event)=>{
                  event.email = userAuthData?.email
                  verifyOtpPost.mutate(event)
                })}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="">
                        <input {...verifyOtpModel.register("otp",{
                          required:{
                            value: true,
                            message:"Please enter OTP"
                          }
                        })} 
                        type="number"
                        className="w-full h-full flex flex-col items-center justify-center 
                        text-center px-5 outline-none rounded-xl border border-gray-200 text-lg
                        bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"/>
                      </div>
                      <p className="text-red-400">{verifyOtpModel.formState.errors.otp?.message}</p>
                      
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                          Verify Account

                          {verifyOtpPost.isPending && <>
                              <svg aria-hidden="true" className="ms-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span className="sr-only">Loading...</span>
                          </>}
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>{`Didn't recieve code?`}</p> <a onClick={()=>{
                          mutate(userAuthData)
                        }} className="flex flex-row items-center text-blue-600" rel="noopener noreferrer">
                          Resend
                          {isPending && <>
                              <svg aria-hidden="true" className="ms-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span className="sr-only">Loading...</span>
                          </>}
                          </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
