import { configureStore } from "@reduxjs/toolkit";
import skillReducer from '../features/skill/skillSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        skill: skillReducer,
        user: userReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch