import { useUnreadMessages } from "../../hooks/useUnreadMessages";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getChatThreads } from "../../services/chatService";
import { useUser } from "../../context/UserContext";

const NotificationBell = () => {
    const [threadIds, setThreadIds] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        const fetchThreads = async () => {


            try {
                const data = await getChatThreads(user._id);
                const ids = data.threads.map((t) => t.chatId);
                setThreadIds(ids);
            } catch (err) {
                console.error("Failed to fetch chat threads:", err);
            }
        };

        fetchThreads();
    }, [user._id]);

    const hasUnread = useUnreadMessages(user._id, threadIds);

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
