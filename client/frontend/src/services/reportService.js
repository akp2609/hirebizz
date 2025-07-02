import apiClient from "../lib/apiClient";

export const postReport = async(formData)=>{
    const res = await apiClient.post('/report/create-report',formData);
    return res.data;
}

export const getAllReports = async()=>{
    const res = await apiClient.get('/report/get-all-reports');
    console.log(res.data);
    return res.data;
}

export const updateReportStatus = async(reportId,formData)=>{
    const res = await apiClient.patch(`/report/${reportId}/status`,formData);
    return res.data;
}