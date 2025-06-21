import { useCallback, useEffect, useState } from "react";
import jobService from '../services/jobService.js';


const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    const getJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchJobs();
            setJobs(data.jobs || []);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    return {
        jobs,
        loading,
        error,
        refreshJobs: getJobs,
    }
}

export default useJobs;