'use client'
import { Chip } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const AdminTables = () => {
    //const {data: session} = useSession();
    const [userList, setUserList] = useState({postgresUser:[]});
    const [loading, setLoading] = useState(false);
    const [userArray, setUserArray] = useState([]);


useEffect(() => {
        async function fetchUsers(){
    try{
        const response= await axios.get('/api/user-API/');
        console.log(response.data);
        setUserList(response.data);
        console.log(userList)
        console.log(userArray);
        console.log(typeof userArray)
        }
    catch(error){
            console.log('Error fetching users:', error);
        } 
    finally{
            setLoading(true);
        }
    };
    fetchUsers();
}, [])

console.log(userList)
console.log(userArray)
console.log(typeof userArray)

const userLevelBadge=(role)=>{
    switch (role) {
        case 'USER':
            return <Chip label={role} color="primary" />

        case 'ADMIN':
            return <Chip label={role} color="sucess" />

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

const table =()=> {
    if(userArray.length > 0){
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
            {Object.values(userArray).map((user)=>{
            <tr className={`border border-2 m-0 bg-white shadow-lg rounded-lg pt-2 pb-2 flex flex-grow`}>
                <td className="flex-grow justify-center items-center flex hover:cursor-default" >
                    <span>id</span>
                </td>
                <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                    <span>{user.name}</span>
                </td>
                <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                    <span>{user.email}</span>
                </td>
                <td className="align-middle flex-grow text-center">
                    {userLevelBadge(user.role)}
                </td>
                <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
                    <span>Date</span>
                </td>
            </tr>
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
        {loading ? table(): <p>Loading users...</p>}
    </div>)

}

export default AdminTables
