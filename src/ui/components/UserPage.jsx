'use client'
import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react"

export default function UserPage(){
    const {data: session, status}=useSession();
    const name= session?.user.name;
    if(status==='loading'){
        return (
        <div className="flex flex-col items-center gap-2 pt-5 justify-center">
        <Skeleton animation="wave" width={300}/>
        <Skeleton animation="wave" width={200} />
        <Skeleton animation="wave" width={300} />
        </div>)
    }
    const profilePage=() =>{
    const Page = <div className="flex pt-5 flex-col items-center gap-2 justify-center">
        <h1>Welcome <span className="text-blue-500">{name}!</span></h1>
        <h1>This is a view of your favorite Tasks:</h1>
        <h1>Access and edit all of your tasks in the nav bar</h1>
        </div>
    return Page;
    }
    return(
        <div>
            {session? profilePage() : <p>You have no access to this page</p> }
        </div>
    )
}