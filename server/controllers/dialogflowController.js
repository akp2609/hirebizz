import client from "../utils/dialogflowClient.js";

const projectId = 'job-tracker-app-458110';
const locationId = 'us-central1';
const agentId = 'dbd82c8e-a509-4249-a509-cea39911931a';
const languageCode = 'en';

export const detectIntent = async(req,res)=>{
    const {text,sessionId} = req.body;

    const sessionPath = client.projectLocationAgentSessionPath(
        projectId,
        locationId,
        agentId,
        sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {text},
            languageCode,
        },
    };

    try{
        const [response] = await client.detectIntent(request);
        const messages = response.queryResult.responseMessages.map(msg => msg.text?.text || []).flat();
        res.json({reply: messages.join(' ')});
    }catch(error){
        console.error('Dialogflow error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}