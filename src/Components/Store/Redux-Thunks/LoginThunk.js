import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const LoginThunk = createAsyncThunk("LoginThunk", async (data, {rejectWithValue}) => {
  try {
    const res = await axiosInterceptor.post("/auth/loginRoute", data);
    // If login failed (e.g. wrong password), show the error
    if (!res.data.success) {
      return rejectWithValue(res?.data?.message);
    }
    // if login succeed
    return res?.data;
    
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message)
  }
});

export default LoginThunk
