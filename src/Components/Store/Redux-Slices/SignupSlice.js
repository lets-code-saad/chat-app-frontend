import { createSlice } from "@reduxjs/toolkit";
import SignupThunk from "../Redux-Thunks/SignupThunk";

const SignupSlice = createSlice({
    name:"SignupSlice",
    initialState: {
        signupUser: null,
        signupLoading: false,
        signupErr:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SignupThunk.pending, (state, action) => {
            state.signupLoading = true
            state.signupErr = null
        })
        builder.addCase(SignupThunk.fulfilled, (state, action) => {
            state.signupLoading = false
            state.signupErr = null
            state.signupUser = action.payload
        })
        builder.addCase(SignupThunk.rejected, (state, action) => {
            state.signupLoading = false
            state.signupErr = action.payload.message
        })
    }
})

export default SignupSlice.reducer