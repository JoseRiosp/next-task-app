'use client'
import { useRouter } from "next/navigation";
import LoginFormik from "../ui/forms/LoginFormik";
import RegisterPage from "../ui/forms/RegisterFormik";
//import { micro_5 } from "./fonts/fonts";
//import Image from "next/image";
//import './../styles/custom-bootstrap.scss';
import { useSession } from "next-auth/react";


export default function LoginPage() {

const {data: session} = useSession();
const router = useRouter();

if(session){
  return (router.push('/log'));
} else {
  return (
    <div className="flex bg-sky-200 h-screen rounded-lg flex-col flex-grow gap-5 items-center justify-center m-2" >
      <div className="flex flex-row gap-10 items-center">
      <RegisterPage/>
      <h1 className="font-bold text-blue-500">OR</h1>
      <LoginFormik/>
      </div>
    </div>
  );
}
}