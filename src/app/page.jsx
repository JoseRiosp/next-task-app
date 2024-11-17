'use client'
import { useRouter } from "next/navigation";
import LoginFormik from "../ui/forms/LoginFormik";
import RegisterPage from "../ui/forms/RegisterFormik";
import { micro_5 } from "./fonts/fonts";
import Image from "next/image";
import './../styles/custom-bootstrap.scss';
//import { useSession } from "next-auth/react";


export default function LoginPage() {

/*const router = useRouter();
const {data: session} = useSession();

if(session){
  return (router.push('/log'));
} else {*/
  return (
    <div className="flex bg-sky-200 h-screen rounded-lg flex-col flex-grow gap-5 items-center justify-center m-2" >
      <div className="flex items-center">
      <h1 className={`${micro_5.className} welcome-text text-blue-500 text-lg"`}>Welcome to</h1>
      <Image width={200} height={40} alt='TaskApp-logo' quality={50} src='/TaskApp-logo.PNG' />
      </div>
      <div className="flex flex-row gap-10">
      <RegisterPage/>
      <h1>OR</h1>
      <LoginFormik/>
      </div>
    </div>
  );
}