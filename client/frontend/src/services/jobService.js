import apiClient from "../lib/apiClient";

export const postJob = async (jobData) => {
    const res = await apiClient.post('/job/create', jobData);
    return res.data;
}

export const deleteJob = async (jobId) => {
    const res = await apiClient.delete(`/job/delete-job/${jobId}`);
    return res.data;
}

export const fetchJobs = async (filters = {}) => {
    const queryParams = new URLSearchParams();


    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
            if (key === 'isActive') {
                queryParams.append(key, value === 'true');
            } else if (Array.isArray(value)) {
                queryParams.append(key, value.join(','));
            } else {
                queryParams.append(key, value);
            }
        }
    });
    const res = await apiClient.get(`/job?${queryParams.toString()}`);
    return res.data;
}

export const fetchJobById = async (jobId) => {
    const res = await apiClient.get(`/job/${jobId}`);
    return res.data;
}

export const closeJobRequest = async (jobId) => {
    const res = await apiClient.patch(`/job/close-job/${jobId}`);
    return res.data;
}

export const fetchEmployerJobs = async()=>{
    const res = await apiClient.get('/job/posted-jobs');
    return res.data;
}