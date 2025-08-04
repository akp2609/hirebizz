import apiClient from "../lib/apiClient";

export const uploadUserProfilePic = async (formData) => {
    const res = await apiClient.post('/user/upload-profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
}

export const uploadUserResume = async (formData) => {
    const res = await apiClient.post('/user/upload-resume', formData);
    return res.data;
}

export const deleteUserResume = async () => {
    const res = await apiClient.delete('/user/delete-resume');
    return res.data;
}

export const saveJob = async (jobId) => {
    const res = await apiClient.post(`/user/${jobId}/save-job`);
    return res.data;
}

export const getUserSavedJobs = async () => {
    const res = await apiClient.get('/user/saved-jobs');
    console.log(res.data.savedJobs);
    return res.data.savedJobs || [];
}

export const getUserRelevantJobs = async () => {
    const res = await apiClient.get('/user/relevant-jobs');
    return res.data;
}

export const verifyEmployer = async () => {
    const res = await apiClient.post('/user/verify-employer');
    return res.data;
}

export const deleteUserSavedJob = async (jobId) => {
    const res = await apiClient.delete(`/user/saved-jobs/${jobId}`);
    return res.data;
}

export const getUserProfile = async () => {
    const res = await apiClient.get('/user/get-profile');
    return res.data;
}

export const updateUserProfile = async (formData) => {
    const res = await apiClient.patch('/user/update-profile', formData);
    return res.data;
}

export const refreshUserResumeURL = async () => {
    const res = await apiClient.get('/user/refresh-resume-url');
    return res.data.resumeURL;
}