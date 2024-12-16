import Link from 'next/link'
import React from 'react'
import { montserrat } from '../../app/fonts/fonts'
import SignOutButton from '../pures/SignOutButton'


const HeaderNav = () => {
    //const [firstLetter] = userName.toUpperCase()

  return (
    <div className="bg-gradient-to-r from-blue-400 via-blue-300
    to-blue-500">
    <div className={`${montserrat.className} pl-6 flex flex-row
    items-center justify-start
    bg-[url('https://www.transparenttextures.com/patterns/batthern.png')] bg-repeat
     h-14`}>
        <Link href="/">
            <div className="w-30 text-white md:w-40 pd-0 items-center">
            {/*<span className='md: text-lg'>Deskstack</span><Image width={500} height={400} alt='TaskApp-logo' quality={50} src='/TaskApp-logo.PNG' ></Image>*/}
            </div>
        </Link>
        <div className='w-3 h-full flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3 items-center h-full'>
            </div>
        </div>
        <div className='h-full w-40 justify-end'>
            <SignOutButton/>
        </div>
    </div>
    </div>
  )
}

export default HeaderNav
