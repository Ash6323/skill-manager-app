import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    loading: boolean,
}

const initialState: InitialState = {
    loading: false,
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        loaderActive: (state) => {
            state.loading = true;
        },
        loaderInactive: (state) => {
            state.loading = false;
        },
    },
})

export default loaderSlice.reducer;
export const { loaderActive, loaderInactive } = loaderSlice.actions;