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
    try{
      logOutService();} catch(error){
      console.log('Error in logOut:', error)
    } finally {
      router.replace('/')
    }
    //router.push('/');
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
    <button onClick={logOut} className="flex grow h-full px-2 pr-6 w-full 
    items-center text-white justify-center gap-2 
    hover:bg-sky-100 hover:text-blue-600
    hover:font-bold">
    <LogoutSharpIcon/>
            <div className="hidden md:block">Log Out</div>
    </button>
  )
}

export default SignOutButton
