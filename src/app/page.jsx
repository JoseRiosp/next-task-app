import Link from "next/link";
import RegisterPage from "../ui/forms/RegisterFormik";
export default function Page() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href='/log'>
      <span>Login</span></Link>
      <RegisterPage/>
    </div>
  );
}