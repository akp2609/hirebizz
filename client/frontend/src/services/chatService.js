import apiClient from "../lib/apiClient";

export const sendMessage = async(formData)=>{
    const res = await apiClient.post('/chat/send',formData);
    return res.data;
}

export const getMessages = async(userId1,userId2)=>{
    const res = await apiClient.get(`/chat/${userId1}/${userId2}`);
    return res.data;
}

export const markMessageAsSeen = async(formData)=>{
    const res = await apiClient.patch('/chat/mark-as-seen',formData);
    return res.data;
}