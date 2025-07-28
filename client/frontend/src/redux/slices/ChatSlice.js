// redux/slices/ChatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    threads: {
        threads: [],
    },
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.threads = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setThreads, setLoading } = chatSlice.actions;
export default chatSlice.reducer;
