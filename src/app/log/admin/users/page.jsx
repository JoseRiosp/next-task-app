'use client'
import { Chip, Skeleton } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { permanentRedirect, redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { auth } from '../../../../../auth';
import { useSelector } from 'react-redux';
import {getUsers} from '../../../../store/slices/userSlice'

export default function UsersPage() {
    //const {data: session} = useSession();
    //const [userList, setUserList] = useState({postgresUsers:[]});
    //const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {users, status, error} = useSelector((state)=>state.users);

console.log('userList:', users)

const userLevelBadge=(role)=>{
    switch (role) {
        case 'user':
            return <Chip label={role} color="primary" />
        case 'admin':
            return <Chip label={role} color="success" />
        default:
            return <Chip label={role} color="primary" />
    }
}
/*const usersTable=()=>{ 
    for(let i=0; i<(userArray.length); i++){
    table= 
    <tr className={`border border-2 m-0 bg-white shadow-lg rounded-lg pt-2 pb-2 flex flex-grow`}>
            <td className="flex-grow justify-center items-center flex hover:cursor-default" >
                <span>id</span>
            </td>
            <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                <span>{userArray[i].name}</span>
            </td>
            <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                <span>{userArray[i].email}</span>
            </td>
            <td className="align-middle flex-grow text-center">
                {userLevelBadge(userArray[i].role)}
            </td>
            <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                <span>Date</span>
            </td>
    </tr>
}
 return table;}*/

const handleUserClick=(userId)=>{
    router.push(`/log/admin/users/${userId}`);
}
const loadingStyle={
    color: 'grey',
    fontSize: '20px',
    fontWeight: 'bold'
  }

const table =()=> {
    if(users.length > 0){
        return(
    <div>
      <table className='rounded-lg flex flex-col items-center justify-start'>
        <thead className='container'>
        <tr className='flex flex-grow mt-2 mb-2 pt-2 items-center text-gray-500'>
            <th className='flex-grow' scope='col'>Id</th>
            <th className='flex-grow' scope='col'>User</th>
            <th className='flex-grow' scope='col'>Email</th>
            <th className='flex-grow' scope='col'>Role</th>
            <th className='flex-grow' scope='col'>Created at:</th>
        </tr>
        </thead>
        <tbody className='m-2 container flex bg-white flex-col gap-3'>
            {users.map((user)=>{
            return (<tr key={user.id}
                        onClick={()=>handleUserClick(user.id)}
                        className={`border border-2 m-0 bg-white shadow-lg 
                        rounded-lg pt-2 pb-2 flex items-center flex-grow 
                        hover:bg-sky-200
                        hover:cursor-pointer`}>
                <td className="flex-grow justify-center items-center flex" >
                    <span>{user.id}</span>
                </td>
                <td className="flex w-3 leading-2 flex-grow">
                    <span>{user.name}</span>
                </td>
                <td className="flex w-3 leading-2 flex-grow">
                    <span>{user.email}</span>
                </td>
                <td className="align-middle flex-grow text-center">
                    {userLevelBadge(user.role)}
                </td>
                <td className="flex w-3 leading-2 flex-grow">
                    <span>{user.createdAt}</span>
                </td>
            </tr>)
            })}
        </tbody>
      </table>
    </div>
  )
} else {
    return <p>There are no users registered</p>
        }
    }


    return (<div>
        {status === 'loading' ? <div className='flex flex-col items-center gap-3 justify-center'>
            <p style={loadingStyle}>Loading users...</p>
            <Skeleton animation="wave" width={300}/>
            <Skeleton animation="wave" width={200} />
            <Skeleton animation="wave" width={300} />
        </div> : table() }
    </div>)

}

