import { createSlice } from "@reduxjs/toolkit";
import GetProfileThunk from "../Redux-Thunks/GetProfileThunk";

const GetProfileSlice = createSlice({
    name:"GetProfileSlice",
    initialState: {
        getProfileUser: null,
        getProfileLoading: false,
        getProfileErr:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetProfileThunk.pending, (state, action) => {
            state.getProfileLoading = true
            state.getProfileErr = null
        })
        builder.addCase(GetProfileThunk.fulfilled, (state, action) => {
            state.getProfileLoading = false
            state.getProfileErr = null
            state.getProfileUser = action.payload
        })
        builder.addCase(GetProfileThunk.rejected, (state, action) => {
            state.getProfileLoading = false
            state.getProfileErr = action.payload.message
        })
    }
})

export default GetProfileSlice.reducer