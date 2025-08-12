import apiClient from "../lib/apiClient"


export const analyticsRecordDownload = async()=>{
    const res = await apiClient.post('/analytics/downloads-update');
    return res.data;
}

export const analyticsRecordLogin = async (platform,userId) => {
    const res = await apiClient.post('/analytics/record-login', { platform, userId });
    return res.data;
}

export const analyticsRecordLogout = async () => {
    const res = await apiClient.post('/analytics/record-logout');
    return res.data;
}