import { BellIcon } from "lucide-react";
import { useEffect } from "react";
import { getChatThreads } from "../../services/chatService";
import { useUser } from "../../context/UserContext";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setThreads } from "../../redux/slices/ChatSlice";
import { useUnreadMessages } from "../../hooks/useUnreadMessages";

const NotificationBell = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const userId = user?._id;

    const threads = useSelector((state) => state.chat.threads);
    const loading = useSelector((state) => state.chat.loading);


    useEffect(() => {
        if (!user || !userId) return;
        const fetchThreads = async () => {
            if (threads?.threads?.length > 0) return;

            dispatch(setLoading(true));
            try {
                const data = await getChatThreads(user._id);
                dispatch(setThreads(data));
            } catch (err) {
                console.error("Failed to fetch chat threads:", err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchThreads();
    }, [userId]);

    const hasUnread = useUnreadMessages(userId);

    if(!userId)return null;

    return (
        <div className="relative">
            <BellIcon size={24} />
            {hasUnread && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            )}
        </div>
    );
};

export default NotificationBell;
