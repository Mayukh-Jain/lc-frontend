import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatWithBot } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I am AgroBot. Ask me anything about farming! 🌾' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await chatWithBot(userMsg);
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Connection error. ⚠️' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col mb-4 border border-green-100 overflow-hidden"
          >
            <div className="bg-agriGreen p-4 text-white flex justify-between items-center">
              <span className="font-bold">AgroBot 🤖</span>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 px-4 rounded-lg max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-agriGreen text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-gray-500 italic">AgroBot is typing...</div>}
            </div>

            <div className="p-3 border-t bg-white flex gap-2">
              <input 
                className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ask about crops..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="bg-agriGreen text-white p-2 rounded-full hover:bg-green-700 transition">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-agriGreen text-white p-4 rounded-full shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;