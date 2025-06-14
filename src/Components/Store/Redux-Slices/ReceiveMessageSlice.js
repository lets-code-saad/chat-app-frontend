import { createSlice } from "@reduxjs/toolkit";
import ReceiveMessageThunk from "../Redux-Thunks/ReceiveMessageThunk";

const ReceiveMessageSlice = createSlice({
  name: "ReceiveMessageSlice",
  initialState: {
    receiveMessage: [],
    receiveMessageLoading: false,
    receiveMessageErr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ReceiveMessageThunk.pending, (state, action) => {
      state.receiveMessageLoading = true;
      state.receiveMessageErr = null;
    });
    builder.addCase(ReceiveMessageThunk.fulfilled, (state, action) => {
      state.receiveMessageLoading = false;
      state.receiveMessageErr = null;
      state.receiveMessage = action?.payload;
    });
    builder
      .addCase(ReceiveMessageThunk.rejected, (state, action) => {
        state.receiveMessageLoading = false;
        state.receiveMessageErr = action.payload;
      })
        // creating this state to empty the array when no conversation
      .addCase("CLEAR_RECEIVE_MESSAGES", (state, action) => {
        state.receiveMessage = [];
      });
  },
});

export default ReceiveMessageSlice.reducer;
