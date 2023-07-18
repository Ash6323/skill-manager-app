import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../constants/Entities';

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

const logoutSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = initialState.user
        },
    },
})

export default logoutSlice.reducer;
export const { logout } = logoutSlice.actions;