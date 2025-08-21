import fetch from 'node-fetch';

const getToken = async()=>{
    console.log("Fetching Azure token...");
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.AZURE_API_CLIENT_ID);
    params.append('client_secret', process.env.AZURE_CLIENT_SECRET_WORKER);
    params.append('scope',`api:\/\/${process.env.API_CLIENT_ID}\/.default`);

    const response = await fetch(`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`, {
        method: 'POST',
        body: params,});

    console.log("Token response status:", response.status);

    if (!response.ok) {
        throw new Error(`Error fetching token: ${response.statusText}`);
    }

    const j = await response.json();
    console.log("Token fetched successfully");
    return j.access_token;
}

const callApi = async()=>{
    console.log("Calling analytics API...");
    const token = await getToken();
    const apires = await fetch(`https://api.hirebizz.xyz/api/analytics/hourly-active-users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!apires.ok) {
        throw new Error(`Error calling API: ${apires.statusText}`);
    }   
    const data = await apires.json();
    console.log("API response data:", data);
    return data;
}

(async () => {
    try {
        await callApi();
    } catch (err) {
        console.error("Error in callApi:", err);
    }
})();