import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import useResumeUpload from "../../hooks/useResumeUpload";
import { useApplication } from "../../hooks/useApplication";
import { toast } from "react-hot-toast";

const ApplyJobModal = ({ jobId, isOpen, onClose }) => {
    console.log("Received jobId in modal:", jobId);
    const { user } = useUser();
    const { resume, uploadNewResume, uploading, error: uploadError } = useResumeUpload();
    const { postNewApplication, applying } = useApplication();

    const [coverLetter, setCoverLetter] = useState("");

    if (!isOpen) return null;

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadedURL = await uploadNewResume(file);
        if (uploadedURL) toast.success("Resume uploaded!");
        else toast.error("Resume upload failed.");
    };

    const handleApply = async () => {
        if (!user?.resumeURL) {
            toast.error("Please upload a resume first.");
            return;
        }

        try {
            const result = await postNewApplication(jobId, { coverLetter });

            if (result) {
                toast.success("Application submitted!");
                onClose();
                setCoverLetter("");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Apply to this Job</h2>


                <div className="mb-4">
                    {user?.resumeURL || resume ? (
                        <>
                            <p className="text-sm">Current Resume:</p>
                            <a
                                href={resume || user.resumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                View Resume
                            </a>
                            <p className="text-sm mt-2">Upload a new resume (optional):</p>
                        </>
                    ) : (
                        <p className="text-sm mb-1">Upload your resume:</p>
                    )}

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        disabled={uploading}
                        className="text-sm"
                    />
                    {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                    {uploadError && <p className="text-xs text-red-500">{uploadError.message}</p>}
                </div>


                <div className="mb-4">
                    <textarea
                        className="w-full border p-2 rounded text-sm"
                        placeholder="Write a cover letter (optional)"
                        rows={4}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                    />
                </div>


                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                        disabled={uploading || applying}
                    >
                        {applying ? "Applying..." : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;
