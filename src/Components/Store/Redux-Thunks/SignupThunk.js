import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const SignupThunk = createAsyncThunk("LoginThunk", async (data) => {
  try {
    const res = await axiosInterceptor.post("/auth/signupRoute",data);
    return res?.data
  } catch (error) {
    toast.error("Signup Error!");
  }
});

export default SignupThunk
