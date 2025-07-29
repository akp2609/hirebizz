import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThreads } from "../../services/chatService";
import { setThreads, setLoading } from "../../redux/slices/ChatSlice";
import { useUser } from "../../context/UserContext";

const ChatThreads = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const userId = user._id;
    const threads = useSelector((state) => state.chat.threads || []);
    const loading = useSelector((state) => state.chat.loading);

    useEffect(() => {
        if (!user || !user._id) return;  // ✅ extra safety

        const fetchThreads = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getChatThreads(user._id);
                dispatch(setThreads(data));
            } catch (error) {
                console.error("Error fetching threads:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchThreads();
    }, [user?._id]);
    if (loading) return <div>Loading...</div>;
    if (!Array.isArray(threads) || threads.length === 0) return <div>No chats available</div>;

    return (
        <div className="chat-threads">
            {threads.map((thread) => (
                <div key={thread._id} className="thread-card">
                    <img src={thread.participant?.profilePic} alt="" className="avatar" />
                    <div className="details">
                        <div className="name">{thread.participant?.name}</div>
                        <div className="last-message">{thread.lastMessage}</div>
                    </div>
                    {thread.unseenCount > 0 && (
                        <div className="unseen-count">{thread.unseenCount}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatThreads;
