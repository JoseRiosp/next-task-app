"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { role } from "../../scripts/roles.enum";
import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { AdminPanelSettings } from "@mui/icons-material";
import UserInterface from "../../scripts/user.interface";

const EditUserForm = ({ userInfo }) => {
  const router = useRouter();
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [errorAdmin, setErrorAdmin] = useState<string | undefined>("");
  const [submitToggle, setSubmitToggle] = useState<boolean>(true);

  const user: UserInterface = userInfo;

  type FormValues = {
    [key: string]: string;
  };
  const initialValues: FormValues = {
    name: user.name,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    password: "",
    birth_day: user.birth_day,
    role: user.role,
  };
  const initialValuesAdmin: FormValues = {
    adminPassword: "",
  };

  const editUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "username is too short")
      .max(12, "username is too long"),
    email: Yup.string().email("Invalid email format"),
    phone: Yup.string(),
    birth_day: Yup.date()
      .max(new Date())
      .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100))),
    password: Yup.string().min(6, "password is too short"),
    confirm: Yup.string().oneOf([Yup.ref("password")], "Password must match!"),
  });

  const adminPasswordSchema = Yup.object().shape({
    adminPassword: Yup.string().min(6, "password is too short"),
  });

  interface ResponseData {
    message: string;
  }

  async function fetchPostUser(values: FormValues | null): Promise<void> {
    console.log(values.role);
    const formData: FormValues = {};
    Object.keys(values).forEach((key) => {
      //only include not-null nor undefined values in the API request
      if (
        values[key] !== null &&
        values[key] !== undefined &&
        values[key] !== "" &&
        values[key] !== user[key]
      ) {
        formData[key] = values[key];
      }
    });
    console.log(formData);
    const formDatalength = Object.keys(formData).length;
    console.log(formDatalength);
    if (formDatalength > 0) {
      try {
        const response = await axios.post(`/api/user-API?id=${user.id}`, {
          values: formData,
          action: "update",
        });
        //setUpdateInfo(response.data.message);
        return console.log(response.data);
      } catch (error) {
        return console.log("Error updating user", error);
      } finally {
        console.log("refreshing...");
        router.refresh();
      }
    } else {
      console.log("refreshing...");
      router.refresh();
    }
  }

  async function fetchDeleteUser(formData: FormValues): Promise<void> {
    try {
      const response = await axios.post<ResponseData>(
        `/api/user-API?id=${user.id}`,
        {
          values: formData,
          action: "delete",
        }
      );
      setErrorAdmin(response.data.message);
      return console.log(response.data);
    } catch (error) {
      return console.log("Error deleting user", error);
    } finally {
      router.refresh();
    }
  }

  const editTable = () => {
    return (
      <div className=" w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={fetchPostUser}
          validationSchema={editUserSchema}
        >
          {({ handleChange, touched, errors, isSubmitting }) => {
            const handlebutton = (e: React.ChangeEvent) => {
              handleChange(e);
              setSubmitToggle(false);
            };
            return (
              <Form className="flex flex-col items-center gap-3">
                <Avatar className="bg-blue-300 h-20 w-20" />
                <table className="bg-blue-50 h-60 w-full text-blue-500 shadow-lg w-full rounded-lg">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th>Username:</th>
                      <td>
                        <label htmlFor="name"></label>
                        <Field
                          id="name"
                          onChange={handlebutton}
                          name="name"
                          type="text"
                        />
                      </td>
                      {errors.name && touched.name && (
                        <div>
                          <ErrorMessage name="name"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr className="bg-blue-100">
                      <th>Full name:</th>
                      <td>
                        <label htmlFor="fullname"></label>
                        <Field
                          onChange={handlebutton}
                          id="fullname"
                          name="fullname"
                          placeholder="full name"
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
                          onChange={handlebutton}
                          name="email"
                          type="email"
                        />
                      </td>
                      {errors.email && touched.email && (
                        <div>
                          <ErrorMessage name="email"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr>
                      <th>New password:</th>
                      <td>
                        <label htmlFor="password"></label>
                        <Field
                          id="password"
                          onChange={handlebutton}
                          name="password"
                          placeholder="write a new password"
                          type="text"
                        />
                      </td>
                      {errors.password && touched.password && (
                        <div>
                          <ErrorMessage name="password"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr>
                      <th>Confirm new password:</th>
                      <td>
                        <label htmlFor="confirm"></label>
                        <Field
                          id="confirm"
                          name="confirm"
                          placeholder="confirm password"
                          type="text"
                        />
                      </td>
                      {errors.confirm && touched.confirm && (
                        <div>
                          <ErrorMessage name="confirm"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr className="bg-blue-100">
                      <th>Phone number:</th>
                      <td>
                        <label htmlFor="phone"></label>
                        <Field
                          id="phone"
                          onChange={handlebutton}
                          name="phone"
                          placeholder="write your number"
                          type="text"
                        />
                      </td>
                      {errors.phone && touched.phone && (
                        <div>
                          <ErrorMessage name="phone"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr>
                      <th>Birth Date:</th>
                      <td>
                        <label htmlFor="birth_day"></label>
                        <Field
                          id="birth_day"
                          onChange={handlebutton}
                          name="birth_day"
                          type="date"
                        />
                      </td>
                      {errors.birth_day && touched.birth_day && (
                        <div>
                          <ErrorMessage name="birth_day"></ErrorMessage>
                        </div>
                      )}
                    </tr>
                    <tr className="bg-blue-100">
                      <th>Role:</th>
                      <td>
                        <label htmlFor="role"></label>
                        <Field
                          as="select"
                          id="role"
                          name="role"
                          onChange={handlebutton}
                        >
                          {Object.values(role).map((role, index) => {
                            return (
                              <option key={index} value={role}>
                                {role.toUpperCase()}
                              </option>
                            );
                          })}
                        </Field>
                      </td>
                    </tr>
                    <tr>
                      <th>Advanced</th>
                      <td>
                        <button
                          className="text-red-500"
                          type="button"
                          onClick={() => {
                            setDeleteUser(true);
                          }}
                        >
                          Delete user
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-col items-center p-3">
                  {!deleteUser && (
                    <div className="flex flex-row gap-3">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={submitToggle}
                      >
                        Save Info
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          router.refresh();
                        }}
                        variant="outlined"
                        color="error"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  {isSubmitting ? (
                    <p className="text-blue-400">Submitting changes...</p>
                  ) : null}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {deleteUser ? (
        <Formik
          initialValues={initialValuesAdmin}
          onSubmit={fetchDeleteUser}
          validationSchema={adminPasswordSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="flex flex-col gap-4 w-full items-center">
                <div className="text-blue-500 flex flex-col gap-2 items-center">
                  <p>
                    Are you sure you want to delete user:{" "}
                    <strong>{user.name}</strong>?
                  </p>
                  <p className="text-red-500">(All data would be lost)</p>
                  <label htmlFor="adminPassword" />
                  <Field
                    id="adminPassword"
                    name="adminPassword"
                    placeholder="Confirm your password"
                    type="password"
                    className="w-full italic"
                  />
                  {isSubmitting ? (
                    <p className="font-italic text-red-500">Deleting user...</p>
                  ) : null}
                  {errorAdmin ? (
                    <p className="text-red-500">
                      <strong>Alert: </strong>
                      {errorAdmin}
                    </p>
                  ) : null}
                </div>
                <div>
                  <div className="flex flex-row gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setDeleteUser(false);
                      }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button variant="outlined" type="submit" color="error">
                      Delete user
                      <AdminPanelSettings />
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        editTable()
      )}
    </div>
  );
};

EditUserForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default EditUserForm;
