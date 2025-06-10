import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const GetProfileThunk = createAsyncThunk("GetProfileThunk", async (_,thunkAPI) => {
  try {
    const res = await axiosInterceptor.get("/auth/getUserProfile");
    return res?.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Profile Getting Err")
  }
});

export default GetProfileThunk
