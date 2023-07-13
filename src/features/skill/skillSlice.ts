import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    toastMessage: string,
}

const initialState: InitialState = {
    toastMessage: "Initial",
}

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        skillFetched: (state, action: PayloadAction <string>) => {
            state.toastMessage = action.payload
            console.log(state.toastMessage)
        },
    },
})

export default skillSlice.reducer;
export const { skillFetched } = skillSlice.actions;