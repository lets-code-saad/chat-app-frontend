import { createSlice } from "@reduxjs/toolkit";
import LoginThunk from "../Redux-Thunks/LoginThunk";

const LoginSlice = createSlice({
    name:"LoginSlice",
    initialState: {
        loginUser: null,
        loginLoading: false,
        loginErr:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LoginThunk.pending, (state, action) => {
            state.loginLoading = true
            state.loginErr = null
        })
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.loginLoading = false
            state.loginErr = null
            state.loginUser = action.payload
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.loginLoading = false
            state.loginErr = action.payload.message
        })
    }
})

export default LoginSlice.reducer