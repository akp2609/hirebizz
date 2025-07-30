import React from "react";

const isLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    }).format(date);
};

const ChatBubble = ({ message, isSender }) => {
    const link = isLink(message.message);
    const baseStyle = "max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words";

    const bgStyle = link
        ? "bg-white text-blue-600 border border-blue-500"
        : isSender
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900";

    const alignment = isSender ? "justify-end" : "justify-start";

    return (
        <div className={`flex ${alignment} mb-2`}>
            <div className={`${baseStyle} ${bgStyle}`}>
                <div>
                    {link ? (
                        <a href={message.message} target="_blank" rel="noopener noreferrer">
                            {message.message}
                        </a>
                    ) : (
                        message.message
                    )}
                </div>
                <div className="text-[10px] text-gray-500 text-right mt-1">
                    {formatTimestamp(message.timestamp)}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
