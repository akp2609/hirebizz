import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase";
import { useSelector } from "react-redux";

export const useUnreadMessages = (userId) => {
    const [hasUnread, setHasUnread] = useState(false);
    const threads = useSelector((state) => state.chat.threads);
    const chatIds = threads?.threads?.map(t => t.chatId) || [];

    useEffect(() => {
        if (!userId || chatIds.length === 0) return;

        const unsubscribers = [];

        chatIds.forEach((chatId) => {
            const chatRef = ref(db, `/${chatId}`);

            const unsubscribe = onValue(chatRef, (snapshot) => {
                let foundUnread = false;

                snapshot.forEach((childSnapshot) => {
                    const msg = childSnapshot.val();
                    if (msg.receiverId === userId && msg.seen === false) {
                        foundUnread = true;
                    }
                });

                setHasUnread((prev) => foundUnread || prev);
            });

            unsubscribers.push(() => off(chatRef));
        });

        return () => {
            unsubscribers.forEach((unsub) => unsub());
        };
    }, [userId, JSON.stringify(chatIds)]); 

    return hasUnread;
};
