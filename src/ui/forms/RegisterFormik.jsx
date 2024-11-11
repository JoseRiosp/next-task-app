'use client';
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { seedUsers } from '../../services/route';
import axios from 'axios';
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
    const [users, setUsers] = useState([])


   async function onSubmitForm(values){
    try{
        const response= await axios.post('/api/seed-users',{
            name: values.username,
            email: values.email,
            password: values.password
        });
        console.log(response.data)}
        catch (error){
        console.error('Error posting users:', error)
    } };

    /*async function onSubmitForm(values) {
        await new Promise((r) => setTimeout(r, 1000));
        alert('User registered')
        alert(JSON.stringify(values, null, 2));
        //localStorage.setItem("credentials", values);
    }*/
    return (
    <div>
        <h4>Register User</h4>
        <Formik 
        initialValues={initialValues}
        onSubmit={onSubmitForm}
        validationSchema={registerSchema}>
                {({ values, touched, errors, isSubmitting, handleSubmit }) => {
            return <Form>
        <div>
            <label htmlFor="username">Your username</label>
            <Field
                id="username"
                name="username"
                placeholder="username"
                type="text"
            />
        </div>
            {errors.username && touched.username && (
                <div><ErrorMessage name="username"></ErrorMessage></div>
            )}
        <div>
            <label htmlFor="email">Write your email</label>
            <Field
                id="email"
                name="email"
                placeholder="email@email.com"
                type="email"
            />
        </div>
            {errors.email && touched.email && (
                <div><ErrorMessage name="email"></ErrorMessage></div>
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
            <button type="submit">Submit</button>
            {isSubmitting ? <p>Login your credentials...</p> : null}
                </Form>;
        }}
        </Formik>
    </div>
  )
}
