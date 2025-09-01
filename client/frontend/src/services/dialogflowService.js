import apiClient from "../lib/apiClient";

export const sendMessageToBot = async(text, sessionId) =>{
    try{
        const response = await apiClient.post('/dialogflow/chatbot-bizzie',{
            text,
            sessionId,
        });
        return response.data.reply;
    }catch (error) {
    console.error('Chatbot error:', error);
    return 'Sorry, something went wrong.';
  }
}