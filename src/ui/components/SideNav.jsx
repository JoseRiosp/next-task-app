'use client'
//import Link from 'next/link'
import React from 'react'
import MenuItems from '../pures/MenuItems'
//import Image from 'next/image'
import { SessionProvider } from 'next-auth/react'
//import { doppio } from "../../app/fonts/fonts";
import { montserrat } from '../../app/fonts/fonts';

const SideNav = () => {
  return (
    <SessionProvider>
    <div className={`flex flex-col px-3 py-4 h-auto md:px-2 ${montserrat.className}`}>
      <div className="flex grow flex-row h-auto justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <MenuItems/>
        <div className="h-auto w-full grow rounded-md bg-white md:block">
        </div>
      </div>
    </div>
    </SessionProvider>
  )
}

export default SideNav
