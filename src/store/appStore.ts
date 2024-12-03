import usersReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer: {
        users: usersReducer
    }
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState =ReturnType<typeof appStore.getState>;
export default appStore;