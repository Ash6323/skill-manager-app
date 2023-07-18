import { configureStore } from "@reduxjs/toolkit";
import skillReducer from '../features/skill/skillSlice';
import userReducer from '../features/user/userSlice';
import loaderReducer from '../features/loader/loaderSlice';

const store = configureStore({
    reducer: {
        skill: skillReducer,
        user: userReducer,
        loader: loaderReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch