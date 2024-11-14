'use client'
import { useRouter } from "next/router";
import LoginFormik from "../ui/forms/LoginFormik";
import RegisterPage from "../ui/forms/RegisterFormik";
export default function LoginPage() {

  const handleAuth = (status)=>{
    const router = useRouter();
    if (status===200){
      router.push('/log')}
      else {router.push('/register')}
    }

  return (
    <div>
      <h1>Register</h1>
      <RegisterPage/>
      <h1>OR</h1>
      <span>Login</span>
      <LoginFormik onAuthenticate={handleAuth} />
    </div>
  );
}