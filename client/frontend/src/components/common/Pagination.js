const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-3 mt-4">
            <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="btn btn-sm btn-outline"
            >
                Prev
            </button>
            <span className="text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
            </span>
            <button
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="btn btn-sm btn-outline"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
