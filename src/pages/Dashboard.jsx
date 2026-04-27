import { useState, useEffect } from 'react';
import '../components/css/Dashboard.css';

const Dashboard = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat');
      const data = await response.json();
      if (data.success) {
        setChats(data.chats);
        if (data.chats.length > 0) {
          setSelectedChat(data.chats[0]);
        }
      } else {
        setError('Failed to fetch chats from server.');
      }
    } catch (err) {
      setError('Could not connect to the backend server. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  if (loading) return <div className="dashboard-loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Chats</h3>
            <p>{chats.length}</p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="dashboard-error">{error}</div>
      ) : (
        <div className="dashboard-layout">
          {/* Left Panel: Chat List */}
          <div className="chat-list-panel">
            <h2>Recent Conversations</h2>
            <div className="chat-list">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`chat-list-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="chat-item-header">
                    <h4>{chat.visitor_name}</h4>
                    <span className="chat-time">
                      {new Date(chat.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="chat-email">{chat.visitor_email}</p>
                  <p className="chat-preview">
                    {chat.messages && chat.messages.length > 0 
                      ? chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'
                      : 'No messages yet'}
                  </p>
                </div>
              ))}
              {chats.length === 0 && <p className="no-chats">No conversations found.</p>}
            </div>
          </div>

          {/* Right Panel: Chat Thread */}
          <div className="chat-thread-panel">
            {selectedChat ? (
              <>
                <div className="thread-header">
                  <h2>{selectedChat.visitor_name}</h2>
                  <p>{selectedChat.visitor_email}</p>
                  <span className="session-id">Session: {selectedChat.session_id}</span>
                </div>
                <div className="thread-messages">
                  {selectedChat.messages && selectedChat.messages.map(msg => (
                    <div key={msg.id} className={`thread-message ${msg.sender}`}>
                      <div className="msg-bubble">
                        {msg.message}
                      </div>
                      <span className="msg-time">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                  {(!selectedChat.messages || selectedChat.messages.length === 0) && (
                    <p className="no-messages">No messages recorded in this session.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <p>Select a conversation to view the full thread</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
