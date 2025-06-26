import React from "react";

const ModalWrapper = ({
    isOpen,
    onClose,
    title = "",
    children,
    showClose = true,
    maxWidth = "max-w-2xl",
    closeOnBackdropClick = true,
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-full ${maxWidth} max-h-[90vh] overflow-y-auto relative`}
            >

                {showClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                )}


                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}


                <div>{children}</div>
            </div>
        </div>
    );
};

export default ModalWrapper;
