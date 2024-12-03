import { AdminPanelSettings, HdrStrongOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { lusitana, montserrat } from '../../app/fonts/fonts'
import SignOutButton from '../pures/SignOutButton'
import { doppio } from "../../app/fonts/fonts";


const HeaderNav = () => {
    const {data: session}=useSession();
    const userName = session?.user.name;
    const userRole = session?.user.role.toUpperCase();
    //const [firstLetter] = userName.toUpperCase()
const userBadge=()=>{
    switch (userRole) {
        case 'ADMIN':
            return <AdminPanelSettings/>
        case 'USER':
        return null;
    }};

  return (
    <div className={`${montserrat.className} pl-6 flex items-center justify-start bg-blue-500 md:h-14`}>
        <Link href="/">
            <div className="w-30 text-white md:w-40 pd-0 items-center">
            <span className='md: text-lg'>Deskstack</span>{/*<Image width={500} height={400} alt='TaskApp-logo' quality={50} src='/TaskApp-logo.PNG' ></Image>*/}
            </div>
        </Link>
        <div className='w-3 h-full flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3 items-center h-full'>
            <Avatar className='bg-blue-300'></Avatar>
            <div className='text-white flex flex-col pr-6' >
                <strong>{userName}</strong>
                <div>
                <span>{userRole}</span>
                {userBadge()}
                </div>
            </div>
            </div>
        </div>
        <div className='h-full'>
            <SignOutButton/>
        </div>
    </div>
  )
}

export default HeaderNav
