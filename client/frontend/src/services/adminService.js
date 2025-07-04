import apiClient from "../lib/apiClient";

export const getAllUsers = async(page = 1,limit = 10)=>{
    const res = await apiClient.get('/admin/get-all-users',{params:{
        page,
        limit,
    }});

    return res.data;
};

export const assignRole = async(formData)=>{
    const res = await apiClient.patch('/admin/assign-role',formData);
    return res.data;
}

export const getAllJobs = async(page=1,limit=10)=>{
    const res = await apiClient.get('/admin/get-all-jobs',{
        param:{
            page,
            limit,
        }
    })
    return res.data;
};

export const updateJobStatus = async(formData)=>{
    const res = await apiClient.patch('/admin/update-job-status',formData);
    return res.data;
}

export const deleteUser = async(formData)=>{
    const res = await apiClient.delete('/admin/delete-user',formData);
    return res.data;
}

export const getUserById = async(userId)=>{
    const res = await apiClient.get(`/admin/get-user/${userId}`);
    return res.data;
}

export const getAdminStats = async()=>{
    const res = await apiClient.get('/admin/stats');
    return res.data;
}