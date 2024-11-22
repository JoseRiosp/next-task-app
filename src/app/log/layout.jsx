'use client'
import { SessionProvider } from "next-auth/react";
import HeaderNav from "../../ui/components/HeaderNav";
import SideNav from "../../ui/components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <SessionProvider>
    <section className="flex flex-col w-full">
      <HeaderNav/>
      <div className="flex flex-row w-full">
      <SideNav className="" />
      <section className="p-3 mx-3 mt-4 m-b0 container rounded-lg items-center h-screen w-screen overflow-hidden bg-gray-100">
        {children}
      </section>
      </div>
    </section>
    </SessionProvider>
  );
}
