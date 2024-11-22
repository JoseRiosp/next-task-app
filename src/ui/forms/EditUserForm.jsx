import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { role } from '../../scripts/roles.enum';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const EditUserForm = ({user}) => {
const router = useRouter();

    const initialValues = {
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        password:'',
        birth_day: user.birth_day,
        role: role.USER
    }

    const editUserSchema = Yup.object().shape(
        {   
            name: Yup.string()
                .min(6, 'username is too short')
                .max(12,'username is too long'),
            email: Yup.string()
                .email('Invalid email format'),
            phone: Yup.number(),
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
            if(values[key] !== null && values[key] !== undefined && values[key] !== ""){
                formData[key] = values[key];
            }
        })
        console.log(formData)
        try{
            const response = await axios.post(`/api/user-API?id=${user.id}`,{
                values: formData
            }
        );
            console.log(response.data)
        } catch(error){
            console.log('Error updating user', error)
        }
      }


  return (
    <div className='w-full flex flex-col'>
    <Formik
        initialValues={initialValues}
        onSubmit={fetchPostUser}
        validationSchema={editUserSchema}>
            {({ touched, errors, isSubmitting }) => {
            return <Form>
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
                type="number"
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
    </tbody>
</table>
<div className='flex flex-col items-center'>
<Button type='submit' variant='contained'>Save Info</Button>
{isSubmitting ? <p>Submitting changes...</p> : null}
</div>

            </Form>
        }}
        </Formik>
    </div>
  )
}

EditUserForm.propTypes={
    user: PropTypes.object.isRequired
}


export default EditUserForm
