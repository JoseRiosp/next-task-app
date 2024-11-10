import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href='/log'>
      <span>Login</span></Link>

    </div>
  );
}