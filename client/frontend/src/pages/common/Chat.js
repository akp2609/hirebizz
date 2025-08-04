import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ArrowDown, Send } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import ChatBubble from "../../components/common/ChatBubble";
import { useUser } from "../../context/UserContext";
import { sendMessage, markMessageAsSeen } from "../../services/chatService";

const ChatPage = () => {
    const { userId: chatUserId } = useParams();
    const { user } = useUser();
    const { state } = useLocation();
    const { name, profilePicture } = state || {};

    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [showScrollDown, setShowScrollDown] = useState(false);

    const chatId = [user._id, chatUserId].sort().join("_");


    useEffect(() => {
    const chatRef = ref(db, chatId);
    const unsubscribe = onValue(chatRef, async (snapshot) => {
        const data = snapshot.val();
        if (!data) return setMessages([]);

        const parsed = Object.entries(data)
            .map(([id, msg]) => {
                const safeTimestamp = typeof msg.timestamp === "number" ? msg.timestamp : 0;
                return { id, ...msg, timestamp: safeTimestamp };
            })
            .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(parsed);

        parsed.forEach(async (msg) => {
            if (!msg.seen && msg.receiverId === user._id) {
                await markMessageAsSeen({ chatId, messageId: msg.id });
            }
        });
    });

    return () => unsubscribe();
}, [chatId, user._id]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
        setShowScrollDown(!nearBottom);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        const trimmed = newMsg.trim();
        if (!trimmed) return;

        try {
            await sendMessage({
                senderId: user._id,
                receiverId: chatUserId,
                message: trimmed,
            });

            setNewMsg("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="flex items-center px-4 py-3 bg-white shadow">
                <img src={profilePicture} alt="User" className="w-10 h-10 rounded-full" />
                <h2 className="ml-3 font-semibold text-gray-800">{name || "Chat User"}</h2>
            </div>

            <div
                className="flex-1 overflow-y-auto p-4 space-y-1"
                onScroll={handleScroll}
                ref={containerRef}
            >
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        isSender={msg.senderId === user._id}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {showScrollDown && (
                <button
                    className="absolute bottom-20 right-5 bg-blue-600 text-white p-2 rounded-full shadow"
                    onClick={scrollToBottom}
                >
                    <ArrowDown size={20} />
                </button>
            )}

            <div className="flex items-center p-4 bg-white border-t">
                <input
                    type="text"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message"
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring"
                />
                <button className="ml-3 p-2 bg-blue-500 rounded-full text-white"
                    onClick={handleSendMessage}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
