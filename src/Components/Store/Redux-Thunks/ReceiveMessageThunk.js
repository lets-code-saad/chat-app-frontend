import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../Middlewares/axiosInterceptor";
import toast from "react-hot-toast";

const ReceiveMessageThunk = createAsyncThunk(
  "ReceiveMessageThunk",
  async (messageReceiverId, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.get(
        `/message/receive-message/${messageReceiverId}`
      );
      // if call succeed
      console.log("Receive response:", res.data)

      return res?.data?.ReceivedMessages;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export default ReceiveMessageThunk;
