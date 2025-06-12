import { createSlice } from "@reduxjs/toolkit";
import SendMessageThunk from "../Redux-Thunks/SendMessageThunk";

const SendMessageSlice = createSlice({
  name: "SendMessageSlice",
  initialState: {
    sendMessage: null,
    sendMessageLoading: false,
    sendMessageErr: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(SendMessageThunk.pending, (state, action) => {
      state.sendMessageLoading = true;
      state.sendMessageErr = null;
    });
    builder.addCase(SendMessageThunk.fulfilled, (state, action) => {
      state.sendMessageLoading = false;
      state.sendMessageErr = null;
      state.sendMessage = action?.payload
    });
    builder.addCase(SendMessageThunk.rejected, (state, action) => {
      state.sendMessageLoading = false;
      state.sendMessageErr = action.payload.message;
    });
  },
});
export default SendMessageSlice.reducer;
