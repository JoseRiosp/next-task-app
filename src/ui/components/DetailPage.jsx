import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from '@mui/material'
import EditUserForm from '../forms/EditUserForm'

const DetailPage = ({user}) => {
    const [infoMod, setInfoMod] = useState('show')

    const table =(infoMod)=>{
        if(infoMod === 'show'){
        return (
            <div className='flex items-center flex-col gap-2 w-full'>
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
            <EditUserForm user={user}/>
        )
    }
}

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-3 h-full'>
        <div className='flex flex-col gap-2 shadow-lg items-center justify-center bg-blue-100 p-2 rounded-lg'>
            <Avatar className='bg-blue-300' sx={{width:80, height:80}}></Avatar>
            {table(infoMod)}
        </div>
        <div className='col-span-2 shadow-lg bg-sky-100 col-start-1 row-start-2 rounded-lg'>
            User Department details
        </div>
        <div className='col-start-2 shadow-lg row-start-1 bg-white rounded-lg'>
            User Document details
        </div>
    </div>
  )
}

DetailPage.propTypes={
    user: PropTypes.object.isRequired
}

export default DetailPage


