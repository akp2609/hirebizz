import React from "react";
import { useSelector } from "react-redux";
import { useUser } from "../../context/UserContext";

const ChatThreadsList = ({ onSelectThread }) => {
    const { user } = useUser();
    const threads = useSelector((state) => state.chat.threads?.threads || []);
    const loading = useSelector((state) => state.chat.loading);

    if (loading) return <div className="text-center py-4 text-gray-500">Loading chats...</div>;
    if (!threads.length) return <div className="text-center py-4 text-gray-500">No chats yet.</div>;

    return (
        <div className="divide-y divide-gray-200">
            {threads.map((thread) => {
                const otherUser = thread.users.find((u) => u._id !== user._id);
                const hasUnread = thread.unreadCount && thread.unreadCount[user._id] > 0;

                return (
                    <div
                        key={thread._id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-all"
                        onClick={() => onSelectThread(thread)}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={otherUser?.profilePic || "/default-avatar.png"}
                                alt={otherUser?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-medium text-gray-900">{otherUser?.name}</div>
                                <div className="text-sm text-gray-500 truncate w-40">
                                    {thread?.lastMessage?.content || "Start the conversation"}
                                </div>
                            </div>
                        </div>
                        {hasUnread && (
                            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-md" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatThreadsList;
