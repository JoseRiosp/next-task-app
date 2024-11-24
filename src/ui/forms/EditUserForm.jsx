'use client'
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { role } from '../../scripts/roles.enum';
import { Avatar, Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import DetailPage from '../components/DetailUserPage';
import { AdminPanelSettings } from '@mui/icons-material';
import DetailUserPage from '../components/DetailUserPage';

const EditUserForm = ({user}) => {
const router = useRouter();
const pathname =usePathname();
const [deleteUser, setDeleteUser] = useState(false);
const [infoMod, setinfoMod] = useState(false)

    const initialValues = {
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        password:'',
        birth_day: user.birth_day,
        role: user.role
    }

    const editUserSchema = Yup.object().shape(
        {   
            name: Yup.string()
                .min(6, 'username is too short')
                .max(12,'username is too long'),
            email: Yup.string()
                .email('Invalid email format'),
            phone: Yup.string(),
            birth_day: Yup.date()
                .max(new Date())
                .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100))),
            password: Yup.string()
                .min(6, 'password is too short')
                .matches(''),
            confirm: Yup.string()
                .oneOf([Yup.ref('password')], 'Password must match!')
        }
    )

    async function fetchPostUser(values){
        console.log(values.role)
        const formData ={};
        Object.keys(values).forEach(key=>{ //only include not-null nor undefined values in the API request
            if(values[key] !== null && values[key] !== undefined && values[key] !== "" && values[key] !== user[key]){
                formData[key] = values[key];
            }
        });
        console.log(formData)
        const formDatalength = Object.keys(formData).length
        console.log(formDatalength)
        if(formDatalength > 0){
            try{
            const response = await axios.post(`/api/user-API?id=${user.id}`,{
                values: formData
                }
            );
                return console.log(response.data);
            } catch(error){
                return console.log('Error updating user', error)
            }finally{
                setinfoMod(true);
            }
        } else {
            setinfoMod(true);
        }
      }

    const editTable =()=>{ 
        if(deleteUser && !infoMod){
            return(
            <form className='flex flex-col gap-4 w-full items-center'>
                <Avatar className='bg-blue-300 h-20 w-20' />
                <h1 className='text-blue-500 flex flex-col items-center'>
                <p>Are you sure you want to delete user: <strong>{user.name}</strong>?</p>
                <strong className='text-red-500'>(All data would be lost)</strong>
                </h1>
                <div>
                <div className='flex flex-row gap-3'>
                    <Button onClick={()=>{
                    setinfoMod(true)
                    }} type='submit' variant='contained'>Cancel</Button>
                    <Button variant='outlined' color='error'>Delete user<AdminPanelSettings/> </Button>
                </div>
                </div>
            </form>
            )
        }
        else if(!deleteUser && !infoMod){
            return(
                <div className=' w-full'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={fetchPostUser}
                    validationSchema={editUserSchema}>
                        {({ touched, errors, isSubmitting }) => {
                        return <Form className='flex flex-col items-center gap-3'>
                            <Avatar className='bg-blue-300 h-20 w-20' />
                            <table className='bg-blue-50 h-60 w-full text-blue-500 shadow-lg w-full rounded-lg'>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>Username:</th>
                        <td>
                        <label htmlFor="name"></label>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                        />
                        </td>
                        {errors.name && touched.name && (
                            <div><ErrorMessage name="name"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr className='bg-blue-100'>
                        <th>Full name:</th>
                        <td>
                            <label htmlFor="fullname"></label>
                            <Field
                            id="fullname"
                            name="fullname"
                            placeholder='full name'
                            type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>
                            <label htmlFor="email"></label>
                            <Field
                            id="email"
                            name="email"
                            type="email"
                            />
                        </td>
                        {errors.email && touched.email && (
                            <div><ErrorMessage name="email"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr>
                        <th>New password:</th>
                        <td>
                            <label htmlFor="password"></label>
                            <Field
                            id="password"
                            name="password"
                            placeholder='write a new password'
                            type="text"
                            />
                        </td>
                        {errors.password && touched.password && (
                            <div><ErrorMessage name="password"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr>
                        <th>Confirm new password:</th>
                        <td>
                            <label htmlFor="confirm"></label>
                            <Field
                            id="confirm"
                            name="confirm"
                            placeholder='confirm password'
                            type="text"
                            />
                        </td>
                        {errors.confirm && touched.confirm && (
                            <div><ErrorMessage name="confirm"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr className='bg-blue-100'>
                        <th>Phone number:</th>
                        <td>
                            <label htmlFor="phone"></label>
                            <Field
                            id="phone"
                            name="phone"
                            placeholder='write your number'
                            type="text"
                            />
                        </td>
                        {errors.phone && touched.phone && (
                            <div><ErrorMessage name="phone"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr>
                        <th>Birth Date:</th>
                        <td>
                            <label htmlFor="birth_day"></label>
                            <Field
                            id="birth_day"
                            name="birth_day"
                            type="date"
                            />
                        </td>
                        {errors.birth_day && touched.birth_day && (
                            <div><ErrorMessage name="birth_day"></ErrorMessage></div>
                        )}
                    </tr>
                    <tr className='bg-blue-100'>
                        <th>Role:</th>
                        <td>
                            <label htmlFor="role"></label>
                            <Field as='select' id="role" name="role">
                                {Object.values(role).map((role, index)=>{
                                return(<option key={index} value={role} >{role.toUpperCase()}</option>)
                                })}
                            </Field>
                        </td>
                    </tr>
                    <tr>
                        <th>Advanced</th>
                        <td>
                            <button className='text-red-500' onClick={()=>{setDeleteUser(true)}}>Delete user</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='flex flex-col items-center p-3'>
                <div className='flex flex-row gap-3'>
                <Button type='submit' variant='contained'>Save Info</Button>
                <Button onClick={()=>{
                    setinfoMod(true)
                    }} variant='outlined' color='error'>Cancel</Button>
                </div>
            {isSubmitting ? <p>Submitting changes...</p> : null}
            </div>
            
                        </Form>
                    }}
                    </Formik>
                </div>
            )}
            else if(infoMod){
                return <DetailUserPage user={user}/>
            }
    }

  return (<div className='w-full flex flex-col items-center gap-3'>
    {editTable()}
  </div>)
}

EditUserForm.propTypes={
    user: PropTypes.object.isRequired
}


export default EditUserForm
