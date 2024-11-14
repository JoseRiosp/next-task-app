'use client';
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";

//Create an scheme with Yup
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"), //"TODO:" Poner el min y max de letras del username
  password: Yup.string().required("Password is required"),
});

const LoginFormik = ({onAuthenticate}) => {
  const initialCredentials = {
    username: "",
    password: "",
  };
  async function authUser(values){
    console.log(values.password);
    const crudName= values.username;
    //require body 
    const name = crudName.toLowerCase();
    const password = values.password;
    try{
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
          alert('user not found');
          onAuthenticate(401);
        }
      }
    catch(error){
      console.log('Error during authentification', error.response);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema} //from Yup
        onSubmit={authUser}
      >
        {({ touched, errors, isSubmitting }) => {
          return <Form>
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
              
              label='password'
              required
            />
            {errors.password && touched.password && (
              <div><ErrorMessage name="password"></ErrorMessage></div>
            )}
            </div>
            <Button variant='outlined' type="submit">Login</Button>
            {isSubmitting ? <p>Login your credentials...</p> : null}
          </Form>;
        }}
      </Formik>
    </div>
  );
};

export default LoginFormik;

