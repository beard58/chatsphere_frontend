import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './ChatStomp.css'; // Use the CSS below for styling

const ChatStomp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [connected, setConnected] = useState(false);
  const stompClient = useRef(null);

  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const connect = () => {
  const socket = new SockJS('http://localhost:8080/ws-chat');
  stompClient.current = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  // Only subscribe after onConnect fires!
  stompClient.current.onConnect = () => {
    setConnected(true);
    stompClient.current.subscribe(
      `/queue/messages/${userId}`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      }
    );
  };

  stompClient.current.activate();
};


  const sendMessage = () => {
    if (stompClient.current && newMessage.trim()) {
      const message = {
        senderId: parseInt(userId),
        receiverId: parseInt(receiverId),
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      // Add the message to the local chat window immediately
      setMessages((prev) => [...prev, message]);
      // Send the message to the backend
      stompClient.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="connection-panel">
        <input
          type="text"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={connected}
        />
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          disabled={connected}
        />
        <button onClick={connect} disabled={connected || !userId || !receiverId}>
          {connected ? 'Connected' : 'Connect'}
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId == userId ? 'sent' : 'received'}`}
          >
            <div className="message-header">
              <span className="sender">{msg.senderId == userId ? 'You' : `User ${msg.senderId}`}</span>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          disabled={!connected}
        />
        <button onClick={sendMessage} disabled={!connected || !newMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatStomp;
