import apiClient from "../lib/apiClient";

export const postUser = async (userData) => {
    const res = await apiClient.post('/auth/register', userData);
    return res.data;
};

export const verifyEmail = async (token) => {
    const res = await apiClient.get(`/auth/verify-email/${token}`);
    return res.data;
}

export const loginUser = async (userData) => {
    const res = await apiClient.post('/auth/login', userData);
    return res.data;
}

export const getUserProfile = async () => {
    const res = await apiClient.get('/auth/profile');
    return res.data;
}

export const requestResetUserPassword = async (userData) => {
    const res = await apiClient.post('/auth/request-reset', userData);
    return res.data;
}

export const resetUserPassword = async (userData) => {
    const res = await apiClient.post('/auth/reset-password', userData);
    return res.data;
}