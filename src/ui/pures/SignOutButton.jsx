'use client'
import React, { useState } from 'react'
import { logOutService } from '../../services/signOut.service'
import { useRouter } from 'next/navigation'
import { signOut } from '../../../auth'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

const SignOutButton = () => {
  const [loginError, setLoginError] = useState('');
  const router = useRouter()
  function logOut(){
    logOutService();
    router.push('/');
    }

    /*async function logOut(){
      try {
        const result= await signOut({redirectTo: '/'});
        console.log(result)
    } catch (error) {
        console.log('Error in signOut request', error)
      }
      throw error;
    }*/

  return (
    <div>
    <button onClick={logOut} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
    <LogoutSharpIcon/>
            <div className="hidden md:block">Sign Out</div>
    </button>
    </div>
  )
}

export default SignOutButton
