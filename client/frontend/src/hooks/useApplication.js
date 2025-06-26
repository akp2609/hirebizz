import { useCallback, useState } from "react"
import { postApplication } from "../services/applicationService";


const useApplication = ()=>{
    const [error,setError] = useState(null);
    const [applying,setApplying] = useState(false);
    const [application,setApplication] = useState(null);

    const postNewApplication = useCallback(async({jobId,coverletter})=>{
        setApplying(true);
        setError(null);
        try{
            const applicationData = new FormData();
            applicationData.append("coverLetter",coverletter);

            const data = await postApplication(jobId,applicationData);
            setApplication(data);
            return data;
        }catch(err){
            console.log('Error applying for the job');
            setError(err);
            return null;
        }finally{
            setApplying(false);
        }
    },[]);

    return {
        application,
        error,
        applying,
        postNewApplication
    }
}

export default useApplication;