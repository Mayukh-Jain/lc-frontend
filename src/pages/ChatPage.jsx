import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Loader } from 'lucide-react';
import { chatWithBot } from '../services/api';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I am AgroBot, your AI farming assistant. 🌾\nAsk me about crop diseases, fertilizer tips, or weather advice!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Auto-scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await chatWithBot(input);
      // Format the response slightly to handle newlines if Gemini sends them
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "⚠️ Network error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 h-[85vh] flex flex-col">
      {/* Header */}
      <div className="bg-agriGreen text-white p-4 rounded-t-2xl shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">AgroBot AI</h1>
            <p className="text-xs text-green-100">Powered by Gemini</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 hover:bg-white/20 rounded-full transition"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border-x border-gray-200 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-agriGreen" />
              </div>
            )}

            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm whitespace-pre-line ${
              msg.sender === 'user' 
                ? 'bg-agriGreen text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start gap-3 animate-pulse">
             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-agriGreen" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none text-gray-500 flex items-center gap-2">
                <Loader size={16} className="animate-spin" /> Thinking...
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="bg-gray-50 p-4 border border-t-0 rounded-b-2xl flex gap-3 shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crops, diseases, or weather..."
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-agriGreen bg-white"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="bg-agriGreen text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send size={18} /> Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;