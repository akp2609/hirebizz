import fetch from 'node-fetch';

const getToken = async () => {
    console.log("Fetching Azure token...");
    
    const requiredEnvVars = ['AZURE_WORKER_CLIENT_ID', 'AZURE_WORKER_SECRET', 'AZURE_TENANT_ID', 'SCOPE'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.AZURE_WORKER_CLIENT_ID);
    params.append('client_secret', process.env.AZURE_WORKER_SECRET);
    params.append('scope', 'api://' + process.env.SCOPE + '/.default');

    console.log("Token request parameters:", {
        grant_type: 'client_credentials',
        client_id: process.env.AZURE_WORKER_CLIENT_ID,
        scope: `api://${process.env.SCOPE}/.default`,
        tenant: process.env.AZURE_TENANT_ID
    });

    const response = await fetch(`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    console.log("Token response status:", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Token error response:", errorText);
        throw new Error(`Error fetching token: ${response.statusText} - ${errorText}`);
    }

    const tokenData = await response.json();
    console.log("Token fetched successfully");
    return tokenData.access_token;
}

const callApi = async () => {
    console.log("Calling analytics API...");
    try {
        const token = await getToken();
        const apiResponse = await fetch(`https://api.hirebizz.xyz/api/analytics/hourly-active-users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error("API error response:", errorText);
            throw new Error(`Error calling API: ${apiResponse.statusText} - ${errorText}`);
        }
        
        const data = await apiResponse.json();
        console.log("API response data:", data);
        return data;
    } catch (error) {
        console.error("Error in callApi:", error);
        throw error;
    }
}

(async () => {
    try {
        await callApi();
        console.log("Workflow completed successfully");
    } catch (err) {
        console.error("Workflow failed:", err);
        process.exit(1);
    }
})();