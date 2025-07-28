import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../redux/slices/ChatSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
});
