import apiClient from "../lib/apiClient"


export const analyticsRecordDownload = async () => {
    const res = await apiClient.post('/analytics/downloads-update');
    return res.data;
}

export const analyticsRecordLogin = async (platform, userId) => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post('/analytics/record-login',
        { platform, userId },
        { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
}

export const analyticsRecordLogout = async () => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post('/analytics/record-logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
}