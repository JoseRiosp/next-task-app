'use client'
import { SessionProvider } from "next-auth/react";
import HeaderNav from "../../ui/components/HeaderNav";
import SideNav from "../../ui/components/SideNav";

export default function ProfileLayout({ children }) {
  return (
    <SessionProvider>
    <section className="flex flex-col w-full">
      <HeaderNav/>
      <div className="flex flex-row w-full">
      <SideNav className="" />
      <section className="pt-6 m-4 container rounded-lg items-center h-screen w-screen overflow-hidden bg-gray-100">
        {children}
      </section>
      </div>
    </section>
    </SessionProvider>
  );
}
