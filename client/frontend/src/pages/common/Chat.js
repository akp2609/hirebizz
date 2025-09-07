import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Send, ArrowLeft, MoreVertical } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import ChatBubble from "../../components/common/ChatBubble";
import { useUser } from "../../context/UserContext";
import { sendMessage, markMessageAsSeen } from "../../services/chatService";

const ChatPage = () => {
    const { userId: chatUserId } = useParams();
    const { user } = useUser();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { name, profilePicture } = state || {};

    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [showScrollDown, setShowScrollDown] = useState(false);

    const chatId = [user._id, chatUserId].sort().join("_");

    // Subscribe to chat messages
    useEffect(() => {
        const chatRef = ref(db, chatId);
        const unsubscribe = onValue(chatRef, async (snapshot) => {
            const data = snapshot.val();
            if (!data) return setMessages([]);

            const parsed = Object.entries(data)
                .map(([id, msg]) => {
                    const safeTimestamp =
                        typeof msg.timestamp === "number" ? msg.timestamp : 0;
                    return { id, ...msg, timestamp: safeTimestamp };
                })
                .sort((a, b) => a.timestamp - b.timestamp);

            setMessages(parsed);

            parsed.forEach(async (msg) => {
                if (!msg.seen && msg.receiverId === user._id) {
                    await markMessageAsSeen({ chatId, messageKey: msg.id });
                }
            });
        });

        return () => unsubscribe();
    }, [chatId, user._id]);

    // Auto-scroll when messages update
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

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <img
                            src={profilePicture}
                            alt="User"
                            className="w-12 h-12 rounded-full border object-cover"
                            onError={(e) =>
                            (e.target.src = `https://ui-avatars.com/api/?name=${name || "User"
                                }&background=6366f1&color=ffffff&size=128`)
                            }
                        />
                        <h2 className="font-semibold text-gray-800 text-lg">
                            {name || "Chat User"}
                        </h2>
                    </div>
                </div>

                {/* Menu only */}
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <MoreVertical size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 bg-gray-50"
                onScroll={handleScroll}
                ref={containerRef}
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Start your conversation
                        </h3>
                        <p className="text-gray-500">
                            Send a message to begin chatting with {name}
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isSender={msg.senderId === user._id}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollDown && (
                <button
                    className="absolute bottom-28 right-6 z-20 p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:scale-110 transition"
                    onClick={scrollToBottom}
                >
                    <ArrowDown size={20} />
                </button>
            )}

            {/* Input */}
            <div className="relative z-10 p-6 bg-white border-t border-gray-200">
                <div className="flex items-end space-x-4">
                    <textarea
                        ref={inputRef}
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition resize-none min-h-[48px] max-h-32"
                        rows={1}
                        style={{ height: "auto", minHeight: "48px" }}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height =
                                Math.min(e.target.scrollHeight, 128) + "px";
                        }}
                    />
                    <button
                        className={`p-3 rounded-full transition ${newMsg.trim()
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        onClick={handleSendMessage}
                        disabled={!newMsg.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
