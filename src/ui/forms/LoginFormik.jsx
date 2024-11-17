'use client';
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { useNavigate } from "react-router-dom";
import { Button} from "@mui/material";
//import axios from "axios";
import { authenticate } from "../../services/actions";

//Create an scheme with Yup
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"), //"TODO:" Poner el min y max de letras del username
  password: Yup.string().required("Password is required"),
});

const LoginFormik = () => {
  const [loginError, setLoginError] = useState('')
  const initialCredentials = {
    username: "",
    password: "",
  };
  /*async function AuthUser(values){
    console.log(values.password);
    const crudName= values.username;
    //require body 
    const username= crudName.toLowerCase();
    const password = values.password;
    try{
    await signIn("credentials",{
      username,
      password,
    });}
    catch(error){
      if(error instanceof AuthError){
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    /*try{
        const response = await axios.post('/api/userAPI-handler.js', {
          name,
          password,
          action: 'authenticate'
    });
    console.log(response.data.message);
    console.log(response.status)
        if(response.status===200){
          onAuthenticate(200);
        }else if (response.status===401){
          onAuthenticate(401);
        }
      }
    catch(error){
      console.error('Error during authentification', error.response?.data || error.message);
    }
  }}*/

async function onSubmit(values){
  const result= await authenticate(values);
  console.log(result);
  setLoginError(result);
}

  return (
    <div>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema} //from Yup
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return <Form>
            <h1>Login</h1>
            <label htmlFor="username"></label>
            <div><Field
              id="username"
              name="username"
              placeholder="username"
              type="text"
              label='username'
              variant="outlined"
              
              required
            />
            {errors.username && touched.username && (
              <div><ErrorMessage name="username"></ErrorMessage></div>
            )}
            </div>
            <div>
            <label htmlFor="password"></label>
            <Field
              id="password"
              name="password"
              type="password"
              variant="filled"
              placeholder='password'
              label='password'
              required
            />
            {errors.password && touched.password && (
              <div><ErrorMessage name="password"></ErrorMessage></div>
            )}
            </div>
            {loginError && <div className="text-red-500">{loginError}</div> }
            <Button variant='outlined' type="submit">Login</Button>
            {isSubmitting ? <p>Login your credentials...</p> : null}
          </Form>;
        }}
      </Formik>
    </div>
  );
};

export default LoginFormik;

