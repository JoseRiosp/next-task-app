"user server";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get all users

export const getUsers = createAsyncThunk("users/getUsers", async()=>{
    const response = await axios.get("/api/user-API");
    return response.data.postgresUsers
});

//To create a new user

export const createUser = createAsyncThunk(
  "users/createUser",
  async (values: any) => {
    const response = await axios.post("/api/register/API", {
      name: values.username,
      email: values.email,
      password: values.password,
    });
    return response.data;
  }
);

//To update a user

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({formData, id}: {formData: any, id: number}) => {
    const response = await axios.put(`/api/user-API?id=${id}`, {
      values: formData,
    });
    return response.data;
  }
);

//To delete a user

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, values: any) => {
    const adminPassword = values.adminPassword;
    console.log("Store: adminPassword:", adminPassword);
    const response = await axios.post(`/api/user-API?id=${id}`, {
      password: adminPassword,
    });
    return response.data;
  }
);

//Slice

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //get all users
    builder 
    .addCase(getUsers.pending, (state)=>{
        state.status = 'loading'
    })
    .addCase(getUsers.fulfilled, (state, action)=>{
        state.users = action.payload
        state.status = 'succeeded'
    })
    .addCase(getUsers.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    });

    //create user
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
        state.status = "succeeded";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //update user
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log('(Slice) PUT response:', action.payload);
        const index = state.users.findIndex(
          (user) => user.id === action.payload.updateUser.id
        );
        if (index !== 1) {
          state.users[index] = action.payload.updateUser;
        }
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //delete user
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.deleteUser.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUserById = (state, userId)=>{
    const id = parseInt(userId);
    return state.users.users.find(user=>user.id === id);
};

export default userSlice.reducer;
