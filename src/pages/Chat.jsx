import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI Farming Assistant. Ask me about crops, diseases, or market prices.", user: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Ref to auto-scroll to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/chatbot', { message: input });
      const botMessage = { text: res.data.response, user: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = { text: "Sorry, I am having trouble connecting to the server.", user: false };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-container">
        <div className="chat-header-section">
          <h2>🤖 AI Agro Assistant</h2>
          <p>Your personal guide for smart farming.</p>
        </div>

        <div className="chat-history">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.user ? 'user-wrapper' : 'bot-wrapper'}`}>
              <div className={`message-bubble ${msg.user ? 'user-bubble' : 'bot-bubble'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="loading-dots">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={sendMessage}>
          <input  
            type="text" 
            placeholder="Type your question here..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            Send ➤ 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;