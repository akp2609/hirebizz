import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThreads } from "../../services/chatService";
import { setThreads,setLoading } from "../../redux/slices/ChatSlice";
import { useUser } from "../../context/UserContext";
import { useNavigate} from "react-router-dom";


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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full text-gray-500">
                Loading chats...
            </div>
        );
    }

    if (!Array.isArray(threads) || threads.length === 0) {
        return (
            <div className="flex justify-center items-center h-full text-gray-400">
                No chats available
            </div>
        );
    }

    return (
        <div className="p-4 space-y-3">
            {threads.map((thread) => {
                const participant = thread.participant || {};
                const { profilePicture, name } = participant;

                return (
                    <div
                        key={thread.chatId}
                        className="flex items-center p-4 bg-white rounded-2xl shadow hover:shadow-md transition cursor-pointer border hover:border-blue-500"
                        onClick={()=>navigate(`/messages/${participant._id}`)}
                    >
                        <img
                            src={profilePicture}
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover border"
                            onError={(e) =>
                                (e.target.src =
                                    "https://ui-avatars.com/api/?name=" + name)
                            }
                        />
                        <div className="flex-1 ml-4">
                            <div className="font-medium text-gray-800">{name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[230px]">
                                {thread.latestMessage?.message || "No messages yet"}
                            </div>
                        </div>
                        {thread.unseenCount > 0 && (
                            <div className="ml-3 bg-blue-500 text-white rounded-full text-xs px-2 py-1 font-semibold">
                                {thread.unseenCount}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatThreads;
