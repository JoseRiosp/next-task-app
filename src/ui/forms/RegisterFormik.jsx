'use client';
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { seedUsers } from '../../services/route';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { authenticate } from '../../services/signIn.service';

//models
//import { User } from '../../scripts/user.class';
//import { role } from '../../../models/roles.enum';

export default function RegisterPage() {



    const initialValues = {
        username: '',
        email:'',
        password:'',
        confirm:'', //to confirm the password
        terms:''
    }
    
    const registerSchema = Yup.object().shape(
        {
            username: Yup.string()
                .min(6, 'username is too short')
                .max(12,'username is too long')
                .required('A username is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('An email is required'),
            password: Yup.string()
                .min(6, 'password is too short')
                .required('A password is required')
                .matches(''),
            confirm: Yup.string()
                .oneOf([Yup.ref('password')], 'Password must match!')
                .required ('You must confirm the password'),
            terms: Yup.boolean()
                .required('You must accept the terms and conditions')
        }
    )

   async function onSubmitForm(values){
    console.log(values.username)
    try{
        const result = await axios.post('/api/register-API/', {
            name: values.username,
            email: values.email,
            password: values.password
        });
        await authenticate(values);
        console.log('New user created:', result);
    }catch(error){
        console.log('Error- register user', error);
    }
    ;
}

    /*try{
        const response= await axios.post('/api/userAPI-post.js',{ //"TODO:" Use Prisma to registe a new user
            name,
            email,
            password,
        });
        console.log(response.data.message)} //'TODO: Redirigir a Dashboard (o Profile) si usuario creado
        catch (error){
        console.error('Error posting users:', error.response)
    } finally{
        resetForm();
    }*/

    /*async function onSubmitForm(values) {
        await new Promise((r) => setTimeout(r, 1000));
        alert('User registered')
        alert(JSON.stringify(values, null, 2));
        //localStorage.setItem("credentials", values);
    }*/
    return (
    <div className='text-blue-500 flex flex-col items-center'>
        <Formik 
        initialValues={initialValues}
        onSubmit={onSubmitForm}
        validationSchema={registerSchema}>
                {({ touched, errors, isSubmitting }) => {
            return <Form className='flex flex-col items-center align-center gap-3'>
        <div>
            <label htmlFor="username"></label>
            <Field
                className='p-1 rounded-lg text-blue-500'
                id="username"
                name="username"
                type="text"
                placeholder='username'
                required
            />
        </div>
            {errors.username && touched.username && (
                <div className='text-red-500'><ErrorMessage name="username"></ErrorMessage></div>
            )}
        <div>
            <label htmlFor="email"></label>
            <Field
                id="email"
                name="email"
                placeholder='email@domain.com'
                type="email"
                required
            />
        </div>
            {errors.email && touched.email && (
                <div  className='text-red-500'><ErrorMessage name="email"></ErrorMessage></div>
            )}
        <div>
            <label htmlFor="password">Write your password</label>
            <Field
                id="password"
                name="password"
                placeholder="password"
                type="password"
            />
        </div>
            {errors.password && touched.password && (
                <div><ErrorMessage name="password"></ErrorMessage></div>
            )}
        <div>
            <label htmlFor="confirm"></label>
            <Field
                id="confirm"
                name="confirm"
                placeholder="Confirm your password"
                type="password"
            />
        </div>
            {errors.confirm && touched.confirm && (
                <div><ErrorMessage name="confirm"></ErrorMessage></div>
            )}
        <div>
            <label htmlFor='terms'> I accept the terms and conditions</label>
            <Field type='checkbox' name='terms' id='terms'></Field>
        </div>
            {errors.terms && touched.terms && (
                <div><ErrorMessage name="terms"></ErrorMessage></div>
            )}
            <Button variant='contained' type="submit">Register</Button>
            {isSubmitting ? <p>Login your credentials...</p> : null}
                </Form>;
        }}
        </Formik>
    </div>
  )
}
