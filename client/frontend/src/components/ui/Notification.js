import { BellIcon } from "lucide-react";
import { useEffect } from "react";
import { getChatThreads } from "../../services/chatService";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setThreads } from "../../redux/slices/ChatSlice";
import { useUnreadMessages } from "../../hooks/useUnreadMessages";
import { Link } from "react-router-dom";

const NotificationBell = ({ userId }) => {
    const dispatch = useDispatch();

    const threads = useSelector((state) => state.chat.threads);
    const loading = useSelector((state) => state.chat.loading);
    const hasUnread = useUnreadMessages(userId);

    useEffect(() => {
        if (!userId || threads?.length > 0) return;

        const fetchThreads = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getChatThreads(userId);
                dispatch(setThreads(data));
            } catch (err) {
                console.error("Failed to fetch chat threads:", err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchThreads();
    }, [userId]);

    if (!userId) return null;

    return (
        <div className="relative">
            <Link to={"/chats"}>
                <BellIcon size={24} />
                {hasUnread && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
            </Link>
        </div>
    );
};

export default NotificationBell;
