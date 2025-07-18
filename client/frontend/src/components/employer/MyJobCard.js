
const MyJobCard = ({ job, onDelete, onClose }) => {
    const { title, location, description, company, createdAt, status,isActive } = job;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div className='space-y-1'>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-600">    {(job.company?.name || 'Unknown Company')} - {job.location}
                </p>
                <p className='text-sm text-gray-700 line-clamp-2'>
                    {description}
                </p>
                <p className="text-xs text-gray-400">Posted on {new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
                {isActive?(<div>
                    <button
                    onClick={() => onClose(job._id)}
                    className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
                    disabled={status === 'closed'}
                >
                    {status === 'closed' ? 'Closed' : 'Close Job'}
                </button>
                <button
                    onClick={() => onDelete(job._id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded"
                >
                    Delete
                </button>
                </div>):(<p className="bg-yellow-200 p-4 font-bold text-yellow-600">Closed</p>)}
            </div>
        </div>
    );
};

export default MyJobCard;
