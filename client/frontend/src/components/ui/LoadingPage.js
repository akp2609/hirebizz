import React from "react";

const LoadingPage = ({ message = "Signing you in..." }) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
           
            <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50" />

        
            <svg
                className="animate-spin h-10 w-10 text-blue-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                ></path>
            </svg>

            {/* Message */}
            <p className="text-gray-600 text-lg font-medium">{message}</p>
        </div>
    );
};

export default LoadingPage;
