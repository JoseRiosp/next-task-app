'use client'
import '../styles/globals.css'
import {montserrat} from './fonts/fonts'
import Copyright from './../ui/components/Copyright'
//import {auth} from "@/auth"
//import { SessionProvider } from 'next-auth/react'
//import { useSession } from 'next-auth/react'

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen' >
        <main className={`${montserrat.className} flex-grow`}>
          {children}
        </main>
        <footer className='p-3 bg-blue-200'>
          <Copyright/>
        </footer>
      </body>
    </html>
  );
}