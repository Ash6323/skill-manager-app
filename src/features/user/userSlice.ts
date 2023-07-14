import useHttp from "../../config/https";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../constants/Entities';
import axios from 'axios';

interface InitialState {
    user: User,
    error: string,
    loading: boolean,
}

const initialState: InitialState = {
    user: {
        id: "",
        userName: "",
        fullName: "",
        gender: "",
        phoneNumber: "",
        email: "",
        profilePictureUrl: "",
        isActive: -1,
        street: "",
        town: "",
        city: "",
        zipcode: "",
        dateOfBirth: "",
        previousOrganisation: "",
        previousDesignation: "",
    },
    error: "",
    loading: false
}

const userProps = JSON.parse(localStorage.getItem("User") || '{}');
const userRole = userProps.role === "Admin" ? `Admin` : `Employee`;

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    const { axiosInstance, loading } = useHttp();
    return useHttp().axiosInstance
        .get(`${userRole}/${userProps.userId}`)
        .then(response => response.data.data)

    // return axios
    // .get(`https://localhost:7247/api/${userRole}/${userProps.userId}`)
    // .then(response => response.data.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            // state.user = "No Change"
            console.log("Something went wrong while fetching user data");
            state.error = action.error.message || 'Something Went Wrong'
            state.loading = false
        })
    }
})
export default userSlice.reducer
