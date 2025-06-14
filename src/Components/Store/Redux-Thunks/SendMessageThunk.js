import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const SendMessageThunk = createAsyncThunk(
  "SendMessageThunk",
  async ({ data, receiverId }, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.post(
        `/message/send-message/${receiverId}`,
        data
      );
      // if login succeed
      console.log(res, "send message from api");
      return res?.data?.newMessage; // Access newMessage from data
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export default SendMessageThunk;
