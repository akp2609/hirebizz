import React from 'react';
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

const BookmarkIcon = ({ isSaved, onClick }) => {
    return (
        <button
            onClick={onClick}
            title={isSaved ? "Unsave Job" : "Save Job"}
            className="text-blue-600 hover:text-blue-800 transition"
        >
            {isSaved ? <IoBookmark size={24} /> : <IoBookmarkOutline size={24} />}
        </button>
    );
};

export default BookmarkIcon;
