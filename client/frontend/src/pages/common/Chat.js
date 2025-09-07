import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/60 transition">
                        <ArrowLeft size={20} className="text-slate-300" />
                    </button>
                    <div className="relative">
                        <img
                            src={profilePicture}
                            alt="User"
                            className="relative w-12 h-12 rounded-full border-2 border-slate-600/50 object-cover"
                            onError={(e) =>
                            (e.target.src = `https://ui-avatars.com/api/?name=${name || "User"
                                }&background=6366f1&color=ffffff&size=128`)
                            }
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-800 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white text-lg">
                            {name || "Chat User"}
                        </h2>
                        <p className="text-sm text-green-400">Online</p>
                    </div>
                </div>

                {/* Menu only (removed phone + video) */}
                <button className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600/60 transition">
                    <MoreVertical size={18} className="text-slate-300" />
                </button>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
                onScroll={handleScroll}
                ref={containerRef}
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">
                            Start your conversation
                        </h3>
                        <p className="text-slate-400">
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
            <div className="relative z-10 p-6 bg-slate-800/80 backdrop-blur-md border-t border-slate-700/50">
                <div className="flex items-end space-x-4">
                    <textarea
                        ref={inputRef}
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400/50 focus:bg-slate-700/70 transition resize-none min-h-[48px] max-h-32"
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
                                : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
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
