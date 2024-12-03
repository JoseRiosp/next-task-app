import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from '@mui/material'
import EditUserForm from '../forms/EditUserForm'

const DetailUserPage = ({user}) => {
    const [infoMod, setInfoMod] = useState('show')

    const table =(infoMod)=>{
        if(infoMod === 'show'){
        return (
            <div className='flex items-center flex-col gap-2 w-full'>
            <Avatar className='bg-blue-300 h-20 w-20' />
            <Button onClick={()=>{setInfoMod('edit')}} variant='outlined'>Edit Info</Button>
                <table className='bg-blue-50 h-60 w-full text-blue-500 shadow-lg rounded-lg'>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>Username:</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr  className='bg-blue-100'>
                        <th>User Id:</th>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <th>Full name:</th>
                        <td>{user.fullname}</td>
                    </tr>
                    <tr  className='bg-blue-100'>
                        <th>Email:</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Phone number:</th>
                        <td>{user.phone}</td>
                    </tr>
                    <tr  className='bg-blue-100'>
                        <th>Birth Date:</th>
                        <td>{user.birth_day}</td>
                    </tr>
                    <tr>
                        <th>Role:</th>
                        <td>{user.role.toUpperCase()}</td>
                    </tr>
                    <tr  className='bg-blue-100'>
                        <th>Last Updated at:</th>
                        <td>{user.updatedAt}</td>
                    </tr>
                    <tr>
                        <th>Created at:</th>
                        <td>{user.createdAt}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        )
    } else if( infoMod === 'edit'){
        return(
            <EditUserForm userInfo={user}/>
        )
    }
};

  return (
    <div className='flex flex-col items-center gap-2 p-2 w-full'>
        {table(infoMod)}
    </div>
  )
}

DetailUserPage.propTypes={
    user: PropTypes.object.isRequired,
}

export default DetailUserPage


