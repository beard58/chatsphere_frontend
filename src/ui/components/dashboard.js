import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

function Dashboard() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('jwtToken'); // Use string key for localStorage

  
  

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const endpoint = `${apiUrl}/api/auth/search/${value}`;
      console.log('Calling search API:', endpoint); // Debug: log API URL
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // Include JWT token in headers
        }
      });
      console.log('Search API response:', response.data); // Debug: log response
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Search API error:', error); // Debug: log error
      setSearchResults([]);
    }
  };

  const handleSelectChat = (user) => {
    setSelectedChat(user);
    setSearch("");
    setSearchResults([]);
    // Add to chat list if not already present
    setChatList((prev) => {
      if (prev.find((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    setMessages((prev) => [
      ...prev,
      { sender: "me", text: message, timestamp: new Date().toLocaleTimeString() }
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg text-green-600">ChatSphere</span>
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" fill="#555" />
                <circle cx="12" cy="12" r="2" fill="#555" />
                <circle cx="19" cy="12" r="2" fill="#555" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => navigate('/login')}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Search bar */}
        <div className="p-3 border-b relative">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            value={search}
            onChange={handleSearch}
          />
          {/* Search results dropdown */}
          {search && (
            <div className="absolute bg-white border rounded shadow-lg mt-1 w-11/12 z-20">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div key={user.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" onClick={() => handleSelectChat(user)}>
                    <div className="font-semibold text-gray-800">{user.fullName}</div>
                    <div className="text-xs text-gray-500">{user.email} | {user.mobileNumber}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>
        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chatList.length > 0 ? (
            chatList.map((user) => (
              <div
                key={user.id}
                className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-100 ${selectedChat && selectedChat.id === user.id ? 'bg-gray-200' : ''}`}
                onClick={() => handleSelectChat(user)}
              >
                <div className="font-semibold text-gray-800">{user.fullName}</div>
                <div className="text-xs text-gray-500">{user.email} | {user.mobileNumber}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center mt-8">No chats yet. Start a new chat from search.</div>
          )}
        </div>
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-chat-pattern bg-repeat bg-[#f0ebe8]">
        {/* Chat header and chat content only if a chat is selected */}
        {selectedChat ? (
          <>
            <ChatHeader selectedChat={selectedChat} />
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="flex flex-col gap-2">
                {selectedChat ? (
                  <div className="self-start bg-gray-200 rounded-lg px-4 py-2 text-gray-800 max-w-xs">
                     
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">Select a chat to start messaging</div>
                )}
                {/* Add more messages as needed */}
              </div>
            </div>
            <MessageInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
              disabled={!selectedChat}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-2xl text-gray-400 font-semibold mb-2">Welcome to ChatSphere</div>
            <div className="text-gray-500">Start chatting by selecting or searching for a user.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
