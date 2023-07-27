import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../constants/entities';

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

// const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//     const userProps = JSON.parse(localStorage.getItem("User") || '{}');
//     const userRole = userProps.role === Users.Admin ? Users.Admin : Users.Employee;
//     const axiosInstance = useHttp();
//     return await axiosInstance
//         .get(`${userRole}/${userProps.userId}`)
//         .then(response => response.data.data)
//         .catch(error => console.log(error));
// })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = initialState.user
        },
    },
    // extraReducers: builder => {
    //     builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
    //         state.user = action.payload;
    //         state.loading = false;
    //         state.error = '';
    //     })
    //     builder.addCase(fetchUser.rejected, (state, action) => {
    //         // state.user = "No Change"
    //         console.log("Something went wrong while fetching user data");
    //         state.error = action.error.message || 'Something Went Wrong';
    //         state.loading = false;
    //     })
    // }
})

// export { fetchUser }
export default userSlice.reducer;
export const { login, logout } = userSlice.actions;