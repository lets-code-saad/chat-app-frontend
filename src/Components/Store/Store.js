import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Redux-Slices/SignupSlice";
import LoginSlice from "./Redux-Slices/LoginSlice";
import GetProfileSlice from "./Redux-Slices/GetProfileSlice";
import GetOtherUsersSlice from "./Redux-Slices/GetOtherUsersSlice";
import SendMessageSlice from "./Redux-Slices/SendMessageSlice";
import ReceiveMessageSlice from "./Redux-Slices/ReceiveMessageSlice";

const Store = configureStore({
  reducer: {
    SignupSlice: SignupSlice,
    LoginSlice: LoginSlice,
    GetProfileSlice: GetProfileSlice,
    GetOtherUsersSlice: GetOtherUsersSlice,
    SendMessageSlice: SendMessageSlice,
    ReceiveMessageSlice: ReceiveMessageSlice,
  },
});

export default Store;
