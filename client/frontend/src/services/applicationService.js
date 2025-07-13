import apiClient from "../lib/apiClient";

export const postApplication = async(jobId,applicationData)=>{
    const res = await apiClient.post(`/applications/apply/${jobId}`,applicationData);
    return res.data;
}

export const getJobApplicationById = async(jobId)=>{
    const res = await apiClient.get(`/applications/job/${jobId}`);
    return res.data;
}

export const getMyJobApplications = async ({ search = "", sortBy = "appliedAt", order = "desc" } = {}) => {
    const query = new URLSearchParams({ search, sortBy, order }).toString();
    const res = await fetch(`/api/user/applications?${query}`, {
        headers: {
            Authorization: `Bearer ${yourToken}`,
        },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch applications");
    return data;
};

export const withdrawJobApplication = async(applicationId)=>{
    const res = await apiClient.delete(`/applications/withdraw-application/${applicationId}`);
    return res.data;
}

export const updateApplicationStatus = async(applicationId,applicationData)=>{
    const res = await apiClient.patch(`/applications/update-application-status/${applicationId}`,applicationData);
    return res.data;
}

export const getAssociatedApplications = async(jobId)=>{
    const res = await apiClient.get(`/applications/${jobId}/associated-applications`);
    return res.data;

}

