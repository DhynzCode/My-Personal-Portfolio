import { useState, useEffect, useRef } from 'react';
import { generateChatResponse } from '../services/gemini';

const QUICK_ACTIONS = [
  "About Me",
  "Skills",
  "Projects",
  "Certificates",
  "Hire Me",
  "Contact"
];

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'model',
      text: "Hello! I’m Gea AI Assistant. Ask me about Geaser Jan Gadingan, his skills, projects, certificates, or hiring availability."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Get bot response
    const botResponseText = await generateChatResponse(messages, text);
    
    // Add bot message
    const botMsg = { id: Date.now() + 1, sender: 'model', text: botResponseText };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const renderMessageText = (text) => {
    const isHiringDetected = /(hire|freelance|project|developer|job|work|internship|opportunity)/i.test(text);
    
    return (
      <>
        {text}
        {isHiringDetected && text.includes("Telegram or Email") && (
          <div className="bot-links">
            <a href="https://t.me/your_telegram_username" target="_blank" rel="noopener noreferrer" className="bot-link-btn">Telegram</a>
            <a href="mailto:geaser.gadingan@gmail.com" className="bot-link-btn">Email</a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="bot-link-btn">Download CV</a>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
      <div className="chat-header">
        <h3>🤖 Gea AI Assistant</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.sender === 'model' ? renderMessageText(msg.text) : msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-actions-container">
        {QUICK_ACTIONS.map(action => (
          <button 
            key={action} 
            className="quick-action-btn"
            onClick={() => handleSendMessage(action)}
            disabled={isTyping}
          >
            {action}
          </button>
        ))}
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isTyping}
        />
        <button 
          onClick={() => handleSendMessage(inputValue)} 
          className="send-btn"
          disabled={isTyping || !inputValue.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
