import { useCallback, useEffect, useState } from "react";
import { uploadUserResume } from "../services/userService";


const useResumeUpload = () => {
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadNewResume = useCallback(async (file) => {
        setUploading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("resume", file);
            const data = await uploadUserResume(formData);
            setResume(data.resumeURL || null);
            return data.resumeURL;
        } catch (err) {
            console.log('Error in uploading resume', err);
            setError(err);
            return null;
        } finally {
            setUploading(false);
        }
    }, []);

    
    return {
        resume,
        uploading,
        error,
        uploadNewResume,
    }
}

export default useResumeUpload;