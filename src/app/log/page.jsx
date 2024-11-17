'use client'
import { SessionProvider } from "next-auth/react";
import UserPage from "../../ui/components/UserPage";


export default function ProfilePage() {
    return (
        <SessionProvider>
        <div className="h-screen m-5 mt-0 bg-white rounded-lg">
            <UserPage/>
        </div>
        </SessionProvider>
    );
}