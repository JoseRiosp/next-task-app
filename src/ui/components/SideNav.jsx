'use client'
import Link from 'next/link'
import React from 'react'
import MenuItems from '../pures/MenuItems'
import Image from 'next/image'
import SignOutButton from '../pures/SignOutButton'
import { SessionProvider } from 'next-auth/react'

const SideNav = () => {
  return (
    <SessionProvider>
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <MenuItems/>
        <div className="h-auto w-full grow rounded-md bg-gray-50 md:block">
        </div>
        <div>
          <SignOutButton/>
        </div>
      </div>
    </div>
    </SessionProvider>
  )
}

export default SideNav
