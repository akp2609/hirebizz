import axios from 'axios';

const fallbackURL = process.env.REACT_APP_FALLBACK_BASE_API_URL;
const customDomain = process.env.REACT_APP_BASE_API_URL;

let baseURL = `${customDomain}/api`;


const isBlocked = async () => {
    try {
        const res = await fetch(`${customDomain}/health`);
        return !res.ok; 
    } catch {
        return true;
    }
};


const createApiClient = async () => {
    const blocked = await isBlocked();
    const finalBaseURL = blocked ? fallbackURL : `${customDomain}/api`;

    const instance = axios.create({
        baseURL: finalBaseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default createApiClient;
