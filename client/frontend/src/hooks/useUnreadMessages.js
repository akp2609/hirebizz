import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from '../firebase'

export const useUnreadMessages = (userId, chatIds = []) => {
    const [hasUnread, setHasUnread] = useState(false);

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
    }, [userId, chatIds]);

    return hasUnread;
};
