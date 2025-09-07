import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThreads } from "../../services/chatService";
import { setThreads, setLoading } from "../../redux/slices/ChatSlice";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ChatThreads = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useUser();
    const userId = user?._id;

    const threads = useSelector((state) => state.chat.threads || []);
    const loading = useSelector((state) => state.chat.loading);

    useEffect(() => {
        if (!userId) return;

        const fetchThreads = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getChatThreads(userId);
                dispatch(setThreads(data.threads));
            } catch (error) {
                console.error("Error fetching threads:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchThreads();
    }, [dispatch, userId]);

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin"></div>
                    <div
                        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin"
                        style={{ animationDelay: "0.3s", animationDirection: "reverse" }}
                    ></div>
                    <div className="mt-6 text-slate-300 text-lg font-medium animate-pulse">
                        Loading conversations...
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (!Array.isArray(threads) || threads.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-slate-700/50">
                        <svg
                            className="w-10 h-10 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">No conversations yet</h3>
                <p className="text-slate-400 text-center max-w-md">
                    Start chatting with someone to see your conversations here. Your messages will
                    appear in this beautiful space.
                </p>
            </div>
        );
    }

    // Threads list
    return (
        <div className="h-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-4">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                        Messages
                    </h1>
                    <p className="text-slate-400">Stay connected with your conversations</p>
                </div>

                {threads.map((thread, index) => {
                    const participant = thread.participant || {};
                    const { profilePicture, name } = participant;
                    const isUnread =
                        thread.latestMessage.seen === false &&
                        thread.latestMessage.receiverId === user._id;

                    return (
                        <div
                            key={thread.chatId}
                            className={`group relative overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 ${isUnread
                                    ? "bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-blue-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/25"
                                    : "bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600/70 hover:shadow-xl hover:shadow-slate-900/50"
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() =>
                                navigate(`/messages/${participant._id}`, {
                                    state: {
                                        name: participant.name,
                                        profilePicture: participant.profilePicture,
                                    },
                                })
                            }
                        >
                            <div className="flex items-center p-4 sm:p-6 relative">
                                {/* Unread indicator */}
                                {isUnread && (
                                    <div className="absolute left-3 top-6">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                        <div className="absolute inset-0 w-3 h-3 bg-blue-400/50 rounded-full animate-ping"></div>
                                    </div>
                                )}

                                {/* Profile picture */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${isUnread
                                                ? "bg-blue-400/40"
                                                : "bg-slate-600/40 group-hover:bg-indigo-400/40"
                                            }`}
                                    ></div>
                                    <img
                                        src={profilePicture}
                                        alt={name}
                                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-slate-600/50 group-hover:border-indigo-400/50 transition-all duration-300"
                                        onError={(e) =>
                                            (e.target.src = `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=ffffff&size=128`)
                                        }
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 ml-4 sm:ml-5 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3
                                            className={`font-semibold text-base sm:text-lg transition-all duration-300 ${isUnread
                                                    ? "text-white"
                                                    : "text-slate-200 group-hover:text-white"
                                                }`}
                                        >
                                            {name}
                                        </h3>
                                        {isUnread && (
                                            <div className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                                                NEW
                                            </div>
                                        )}
                                    </div>
                                    <p
                                        className={`text-sm truncate transition-all duration-300 ${isUnread
                                                ? "text-blue-100 font-medium"
                                                : "text-slate-400 group-hover:text-slate-300"
                                            }`}
                                    >
                                        {thread.latestMessage?.message || "Start a conversation..."}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                    <svg
                                        className="w-5 h-5 text-indigo-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatThreads;
