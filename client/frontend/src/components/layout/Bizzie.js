import { useEffect, useRef, useState } from "react";
import { sendMessageToBot } from "../../services/dialogflowService";
import { Bot } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ChatBotWidget = ()=>{

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const sessionId = useRef(uuidv4());

    const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const botReply = await sendMessageToBot(input, sessionId.current);
    const botMsg = { sender: 'bot', text: botReply };
    setMessages(prev => [...prev, botMsg]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    return(
    <div className="fixed bottom-6 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span>Chatbot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-xs ${
                  msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t border-gray-200 p-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
    )
}

export default ChatBotWidget;