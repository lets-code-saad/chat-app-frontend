import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const GetOtherUsersThunk = createAsyncThunk("GetOtherUsersThunk", async (_, {rejectWithValue}) => {
  try {
    const res = await axiosInterceptor.get("/message/other-users");
    // if call succeed
    return res?.data;
    
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message)
  }
});

export default GetOtherUsersThunk
