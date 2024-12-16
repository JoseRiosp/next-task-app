'use client'
import { SessionProvider } from "next-auth/react";
import HeaderNav from "../../ui/components/HeaderNav";
import SideNav from "../../ui/components/SideNav";
import { montserrat } from "../fonts/fonts";

export default function DashboardLayout({ children }) {
  return (
    <SessionProvider>
    <section className={`flex flex-col w-full ${montserrat.className}`}>
      <HeaderNav/>
      <div className="flex flex-col md:flex-row w-full">
      <SideNav/>
      <section className="mx-3 mt-4 m-b0 container 
      rounded-lg items-center h-screen w-screen overflow-hidden bg-gray-50">
        {children}
      </section>
      </div>
    </section>
    </SessionProvider>
  );
}
