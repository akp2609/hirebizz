import React from "react";
import { ExternalLink, Clock } from "lucide-react";

const isLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
};

const formatTimestamp = (timestamp) => {
    if (!timestamp || isNaN(timestamp)) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    }).format(date);
};

const ChatBubble = ({ message, isSender }) => {
    const link = isLink(message.message);

    return (
        <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3 px-1`}>
            <div className={`relative max-w-[75%] group ${isSender ? "mr-2" : "ml-2"}`}>
                {/* Message Container */}
                <div
                    className={`
                        relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 
                        ${link
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 hover:shadow-md"
                            : isSender
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-lg"
                                : "bg-white border border-gray-200 text-gray-800 shadow-gray-200/50 hover:shadow-md"
                        }
                        ${isSender
                            ? "rounded-br-md"
                            : "rounded-bl-md"
                        }
                        group-hover:scale-[1.02] transform
                    `}
                >
                    {/* Message Tail */}
                    <div
                        className={`
                            absolute w-0 h-0 
                            ${isSender
                                ? "right-0 border-l-[12px] border-t-[12px] border-b-[4px] border-l-blue-500 border-t-transparent border-b-transparent -mr-[11px] bottom-0"
                                : "left-0 border-r-[12px] border-t-[12px] border-b-[4px] border-r-white border-t-transparent border-b-transparent -ml-[11px] bottom-0"
                            }
                            ${link && !isSender ? "border-r-blue-50" : ""}
                        `}
                    />

                    {/* Message Content */}
                    <div className="relative z-10">
                        {link ? (
                            <a
                                href={message.message}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="break-all">{message.message}</span>
                                    <ExternalLink className="w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                                </div>
                            </a>
                        ) : (
                            <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                {message.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Timestamp */}
                <div className={`
                    flex items-center gap-1 text-[10px] mt-1 px-2 transition-opacity duration-200 opacity-70 group-hover:opacity-100
                    ${isSender ? "text-blue-600 justify-end" : "text-gray-500 justify-start"}
                `}>
                    <Clock className="w-2.5 h-2.5" />
                    <span>{formatTimestamp(message.timestamp)}</span>
                </div>

                {/* Delivery Status for Sender (Optional Enhancement) */}
                {isSender && (
                    <div className="absolute -bottom-1 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBubble;