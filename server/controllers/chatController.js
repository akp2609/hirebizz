import db from "../utils/firebaseAdmin.js";
import { sendUnseenMessagesEmail } from "../utils/mailer.js";
import User from '../models/User.js';


export const sendMessages = async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    const timestamp = Date.now();

    try {

        const chatId = [senderId, receiverId].sort().join("_");
        const ref = db.ref(`${chatId}`).push();

        await ref.set({
            senderId,
            receiverId,
            message,
            timestamp,
            seen: false,
            reminderSent: false
        });

        res.status(200).json({ success: true, message: "Message Sent" })

    }
    catch (err) {
        console.error('Failed to save messages: ', err);
        return res.status('500').json({ success: false, message: 'Error is saving messages' })
    }
}

export const checkUnseenMessages = async (req, res) => {
    console.log("controller called");
    const ref = db.ref("/");

    try {
        const snapshot = await ref.once("value");
        console.log("snapshot received: ", snapshot.val());
        const now = Date.now();

        const reminders = [];

        for (const [chatId, chatMessages] of Object.entries(snapshot.val() || {})) {
            for (const [messageKey, msg] of Object.entries(chatMessages)) {
                const { timestamp, seen, senderId, receiverId, reminderSent } = msg;
                const hasReminderBeenSent = reminderSent === true;

                if (!seen && !hasReminderBeenSent && now - timestamp > 60 * 60 * 1000) {
                    reminders.push({ senderId, receiverId });

                    try {
                        await db.ref(`${chatId}/${messageKey}`).update({ reminderSent: true });
                        console.log(`✅ reminderSent set for ${chatId}/${messageKey}`);
                    } catch (err) {
                        console.error(`❌ Failed to update ${chatId}/${messageKey}:`, err);
                    }
                }
            }
        }



        const uniqueRecievers = new Map();

        for (const { senderId, receiverId } of reminders) {
            if (!uniqueRecievers.has(receiverId)) {
                uniqueRecievers.set(receiverId, senderId);
            }
        }

        for (const [receiverId, senderId] of uniqueRecievers.entries()) {
            const receiver = await User.findById(receiverId);
            if (!receiver?.email) {
                console.log("❌ Could not find email for receiverId:", receiverId);
                continue;
            }

            const sender = await User.findById(senderId);

            if (sender?.name) {
                console.log(`📧 Sending email to ${receiver.email} from ${sender.name}`);
                await sendUnseenMessagesEmail(receiver.email, sender.name);



                console.log(`✅ Sent reminder to ${receiver.email}`);
            }
        }

        res?.status(200).json?.({ status: "Reminder check completed" });
    }
    catch (err) {
        console.error("❌ Error checking unseen messages:", err);
        res.status(500).json({ success: false, message: "Error checking unseen messages" });
    }
}

export const getChat = async (req, res) => {
    const { user1, user2 } = req.params;
    const chatId = [user1, user2].sort().join('_');

    try {
        console.log('fetchng chat for chatId: ', chatId);
        const snapshot = await db.ref(`${chatId}`).once("value");
        res.status(200).json(snapshot.val() || {});
    }
    catch (err) {
        console.error('failed to get chat: ', err);
        res.status(500).json({ success: false, message: 'Failed to get chats' });
    }
}


export const markAsSeen = async (req, res) => {
    const { chatId, messageKey } = req.body;
    try {
        await db.ref(`${chatId}/${messageKey}`).update({ seen: true });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Failed to mark as seen the messages: ', err);
        res.status(500).json({ success: false, message: 'Failed to mark as seen the messages' });
    }

}

export const getUserChatThreads = async (req, res) => {
    const { userId } = req.params;

    try {
        const snapshot = await db.ref("/").once("value");
        const data = snapshot.val() || {};

        const relevantChatIds = Object.keys(data).filter(chatId =>
            chatId.includes(userId)
        );


        const relevantChats = await Promise.all(relevantChatIds.map(async (chatId) => {
            const [user1, user2] = chatId.split("_");
            const otherUserId = user1 === userId ? user2 : user1;
            const user = await User.findById(otherUserId).select('name email profilePicture');
            if (user) {
                return { chatId, participant: user };
            }
            return null;
        }));


        const filteredChats = relevantChats.filter(chat => chat !== null);

        res.status(200).json({ threads: filteredChats });
    } catch (err) {
        console.error("Failed to get user threads:", err);
        res.status(500).json({ message: "Failed to get user threads" });
    }
};
