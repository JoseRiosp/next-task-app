'use client';
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";


//Create an scheme with Yup
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"), //TODO: Poner el min y max de letras del username
  password: Yup.string().required("Password is required"),
});

const LoginFormik = () => {

  const initialCredentials = {
    username: "",
    password: "",
  };

  /*async function onSubmitForm(values) {
    await new Promise((r) => setTimeout(r, 800));
    alert(JSON.stringify(values, null, 2));
    localStorage.setItem("credentials", values);
    navigate('/');
  }*/

/*const authUser = async (values)=>{
        login(values.email, values.password)
        .then((response)=>{
            if(response.data.token){
                alert(JSON.stringify('authorized:',response.data.token));
                sessionStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.removeItem('token');
                throw new Error('Failed POST method, no token')}
        })
        .catch((error)=>{
            alert('error:',error);
            sessionStorage.removeItem('token');
        })
        .finally(()=>{
            console.log('Login finished');
            navigate('/')
        })
    }*/

  return (
    <div>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema} //from Yup
        onSubmit={authUser}
      >
        {({ values, touched, errors, isSubmitting, handleSubmit }) => {
          return <Form>
            <label htmlFor="email"></label>
            <div><TextField
              id="email"
              name="email"
              placeholder="example@mail.com"
              type="email"
              label='Email'
              variant="outlined"
              required
            />
            {errors.email && touched.email && (
              <div><ErrorMessage name="email"></ErrorMessage></div>
            )}
            </div>
            <div>
            <label htmlFor="password"></label>
            <TextField
              id="password"
              name="password"
              type="password"
              variant="filled"
              label='Password'
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