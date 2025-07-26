import axios from 'axios';

const fallbackURL = process.env.REACT_APP_FALLBACK_BASE_API_URL;
const customDomain = process.env.REACT_APP_BASE_API_URL;

let baseURL = `${customDomain}/api`;

const isBlocked = async () => {
    try {
        await fetch(`${customDomain}/health`);
        return false;
    } catch (err) {
        return true;
    }
}

(async () => {
    if (await isBlocked()) baseURL = `${fallbackURL}/api`;
})();

const apiClient = axios.create({
    baseURL
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        
        if (
            !(config.data instanceof FormData) &&
            !config.headers['Content-Type']
        ) {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export default apiClient;