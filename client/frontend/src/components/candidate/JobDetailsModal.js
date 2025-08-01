import React, { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import ApplyJobModal from "./ApplyJobModal";
import { useUser } from "../../context/UserContext";

const JobDetailsModal = ({ job, isOpen, onClose, isAdminView = false }) => {
    const [applyOpen, setApplyOpen] = useState(false);
    const {user} = useUser()

    if (!isOpen || !job) return null;

    return (
        <>
            <ModalWrapper
                isOpen={isOpen}
                onClose={onClose}
                title={job.title}
                maxWidth="max-w-3xl"
            >
                <p className="text-sm text-gray-500 mb-2">
                    {job.company?.name || "Unknown Company"} • {job.location}
                </p>

                <div className="whitespace-pre-wrap text-sm text-gray-800 mb-4">
                    {job.description}
                </div>

                {job.skills?.length > 0 && (
                    <div className="mb-4">
                        <p className="font-semibold">Skills:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {job.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-200 px-2 py-1 text-xs rounded"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <p className="font-semibold">Compensation:</p>
                    <p className="text-sm">₹{job.compensation}</p>
                </div>


                {!isAdminView && (
                    <div className="flex justify-end mt-6">
                        {user?.appliedJobs?.includes(job._id.toString()) ? (
                            <p className="text-sm text-gray-500">Already applied</p>
                        ) : (
                            <button
                                onClick={() => setApplyOpen(true)}
                                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 text-sm"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                )}

            </ModalWrapper>


            {!isAdminView && job && job._id && (
                <ApplyJobModal
                    isOpen={applyOpen}
                    onClose={() => setApplyOpen(false)}
                    jobId={job?._id}
                />
            )}
        </>
    );
};

export default JobDetailsModal;
