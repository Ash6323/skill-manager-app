import { configureStore } from "@reduxjs/toolkit";
import skillReducer from '../features/skill/skillSlice';

const store = configureStore({
    reducer: {
        skill: skillReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch