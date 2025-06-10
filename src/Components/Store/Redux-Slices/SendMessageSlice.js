import { createSlice } from "@reduxjs/toolkit";
import SendMessageThunk from "../Redux-Thunks/SendMessageThunk";

const SendMessageSlice = createSlice({
  name: "SendMessageSlice",
  initialState: {
    sendMessage: [],
    sendMessageLoading: false,
    sendMessageErr: null,
  },
  reducers: {
    setSendMessage: (state, action) => {
      state.sendMessage.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SendMessageThunk.pending, (state, action) => {
      state.sendMessageLoading = true;
      state.sendMessageErr = null;
    });
    builder.addCase(SendMessageThunk.fulfilled, (state, action) => {
      state.sendMessageLoading = false;
      state.sendMessageErr = null;
      state.sendMessage.push(action.payload);
    });
    builder.addCase(SendMessageThunk.rejected, (state, action) => {
      state.sendMessageLoading = false;
      state.sendMessageErr = action.payload.message;
    });
  },
});
export const { setSendMessage } = SendMessageSlice.actions;
export default SendMessageSlice.reducer;
