'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";
import DetailPage from "../../../../../ui/components/DetailPage";


export default function DetailUserPage({params}) {
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
        return <p>Loading user info...</p>
    }
    console.log(user)
    return (
        <div className="h-full">
        <DetailPage user={user}/>
        </div>

    );
}