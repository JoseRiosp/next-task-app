'use client'
import Link from 'next/link'
import React from 'react'
import MenuItems from '../pures/MenuItems'
import Image from 'next/image'
import SignOutButton from '../pures/SignOutButton'

const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40 pd-0 items-center">
        <Image width={500} height={400} alt='TaskApp-logo' quality={50} src='/TaskApp-logo.PNG' ></Image>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <MenuItems/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <SignOutButton/>
        </div>
      </div>
    </div>
  )
}

export default SideNav
