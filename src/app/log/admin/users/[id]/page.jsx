'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import DetailUserPage from "../../../../../ui/components/DetailUserPage";
import { useDispatch, useSelector } from "react-redux";
import {selectUserById} from "../../../../../store/slices/userSlice"


export default function UsersPage({params}) {
    //const [userParams, setUserParams] = useState()
    //const [loading, setLoading] = useState(true)
    //const [user, setUser] = useState({user:[]});
    const resolvedParams =use(params); //Needed use of use(params)to await the params promise
    const userId=resolvedParams.id;
    const dispatch = useDispatch();
const status = useSelector((state)=> state.users.status);
const user= useSelector((state)=>selectUserById(state,userId));

    if(status === 'loading'){
        return (<div className='flex flex-col items-center gap-3 justify-center'>
            <p className='text-gray-400 font-bold text-5'>Loading user info details...</p>
            <Skeleton animation="wave" width={300}/>
            <Skeleton animation="wave" width={200} />
            <Skeleton animation="wave" width={300} />
        </div>)
    }
    console.log('user:',user)
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