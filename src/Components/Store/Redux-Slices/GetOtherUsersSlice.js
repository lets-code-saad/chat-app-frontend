import { createSlice } from "@reduxjs/toolkit";
import GetOtherUsersThunk from "../Redux-Thunks/GetOtherUsersThunk";

const GetOtherUsersSlice = createSlice({
    name:"GetOtherUsersSlice",
    initialState: {
        getOtherUsers: [],
        getOtherUsersLoading: false,
        getOtherUsersErr:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetOtherUsersThunk.pending, (state, action) => {
            state.getOtherUsersLoading = true
            state.getOtherUsersErr = null
        })
        builder.addCase(GetOtherUsersThunk.fulfilled, (state, action) => {
            state.getOtherUsersLoading = false
            state.getOtherUsersErr = null
            state.getOtherUsers = action.payload
        })
        builder.addCase(GetOtherUsersThunk.rejected, (state, action) => {
            state.getOtherUsersLoading = false
            state.getOtherUsersErr = action.payload.message
        })
    }
})

export default GetOtherUsersSlice.reducer