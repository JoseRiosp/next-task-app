'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import DetailUserPage from "../../../../../ui/components/DetailUserPage";


export default function UsersPage({params}) {
    //const [userParams, setUserParams] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({user:[]});
    const resolvedParams =use(params); //Needed use of use(params)to await the params promise
    const userId=resolvedParams.id;

    useEffect(() => {
        async function getUser(){
            if (!userId) return;
        try{
            const response = await axios.get(`/api/user-API?id=${userId}`)
            setUser(response.data.user);
            console.log(user)
        } catch(error){
            console.log('Error getting user', error)
        } finally {
            setLoading(false);
        }
    }
    getUser();
        }, [userId])
    
    if(loading){
        return (<div className='flex flex-col items-center gap-3 justify-center'>
            <p className='text-gray-400 font-bold text-5'>Loading user info details...</p>
            <Skeleton animation="wave" width={300}/>
            <Skeleton animation="wave" width={200} />
            <Skeleton animation="wave" width={300} />
        </div>)
    }
    console.log(user)
    return (
    <div className='flex flex-col gap-3 h-full'>
        <div className="flex flex-row gap-3">
            <div className='flex flex-col gap-2 w-1/2 shadow-lg items-center justify-center bg-blue-100 p-2 rounded-lg'>
                <DetailUserPage user={user} />
            </div>
            <div className='col-start-2 w-1/2 shadow-lg row-start-1 bg-white rounded-lg'>
            User Document details
            </div>
            
        </div>
        <div className='col-span-2 h-auto w-full shadow-lg bg-sky-100 col-start-1 row-start-2 rounded-lg'>
                User Department details
        </div>
    </div>

    );
}