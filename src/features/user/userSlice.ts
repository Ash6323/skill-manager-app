import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../constants/Entities'

interface InitialState {
    user: User,
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
    }
}

