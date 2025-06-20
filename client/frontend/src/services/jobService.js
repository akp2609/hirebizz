import apiClient from "../lib/apiClient";

export const postJob = async(jobData)=>{
    const res = await apiClient.post('/job/create',jobData);
    return res.data;
}

export const deleteJob = async(jobId)=>{
    const res = await apiClient.delete(`/job/delete-job/${jobId}`);
    return res.data;
}

export const fetchJobs = async()=>{
    const res = await apiClient.get('/job');
    return res.data;
}

export const fetchJobById = async(jobId)=>{
    const res = await apiClient.get(`/job/${jobId}`);
    return res.data;
}