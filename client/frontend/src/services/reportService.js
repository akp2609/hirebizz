import apiClient from "../lib/apiClient";

export const postReport = async(formData)=>{
    const res = await apiClient.post('/report/create-report',formData);
    return res.data;
}

export const getAllReports = async()=>{
    const res = await apiClient.get('/admin/get-all-reports');
    return res.data;
}

export const updateReportStatus = async(reportId,formData)=>{
    const res = await apiClient.patch(`/admin/${reportId}/status`,formData);
    return res.data;
}