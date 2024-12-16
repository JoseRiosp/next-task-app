'use client'
//import Link from 'next/link'
import React from 'react'
import MenuItems from '../pures/MenuItems'
//import Image from 'next/image'
import { SessionProvider, useSession } from 'next-auth/react'
//import { doppio } from "../../app/fonts/fonts";
import { montserrat, dosis, doppio } from '../../app/fonts/fonts';
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';
//import { AdminPanelSettings } from '@mui/icons-material';

const SideNav = () => {
  const {data: session } = useSession();
  const userName = session?.user.name;
  const userRole = session?.user.role.toUpperCase();

  return (
    <SessionProvider>
    <div className={`flex flex-row md:flex-col md:w-1/6 px-3 py-4 h-auto md:px-2 
      ${montserrat.className}`}>
    
      <div className=' flex flex-row gap-2 px-4 py-2 md:py-4 fixed md:static'>
      <motion.a href='/log/admin/settings'
        whileHover={{scale:1.3}}
        transition={{type:'spring'}}
      ><Avatar 
      alt='elber rios' src='/elberrios.jpg'></Avatar></motion.a>
      <div className='md:flex text-black md:flex-col pr-6 hidden md:block' >
                <strong className='text-blue-400'>{userName}</strong>
                <strong>{userRole}</strong>
        </div>
      </div>
      <div className="flex transform translate-x-20 flex-row h-auto 
      md:translate-x-0 justify-between 
      space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <MenuItems/>
        <div className="w-full h-40 rounded-md bg-white md:block">
        </div>
      </div>
    </div>
    </SessionProvider>
  )
}

export default SideNav
