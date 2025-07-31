import { useCallback, useState, useEffect } from "react"
import { postApplication, getAssociatedApplications } from "../services/applicationService";

export const useApplication = () => {
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);
    const [application, setApplication] = useState(null);

    const postNewApplication = useCallback(async ({ jobId, coverletter }) => {
        setApplying(true);
        setError(null);
        try {
            const applicationData = new FormData(); 
            applicationData.append("coverLetter", coverletter);

            const data = await postApplication(jobId, applicationData); 
            setApplication(data);
            return data;
        } catch (err) {
            console.log('Error applying for the job', err);
            setError(err);
            return null;
        } finally {
            setApplying(false);
        }
    }, []);



    return {
        application,
        error,
        applying,
        postNewApplication
    }
}

export const useApplications = (jobId) => {
    console.log('Entered hook');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log("Calling getAssociatedApplications with jobId:", jobId);
                const data = await getAssociatedApplications(jobId);
                console.log("Fetched applications:", data);
                const appList = data?.applications || [];
                setApplications(appList);
            } catch (err) {
                console.error("Error fetching applications:", err);
                setError('Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        if (jobId) getData();
    }, [jobId]);
    console.log('From hook', applications);
    return { applications, loading, error };
};
