import React from 'react';



function MessageInput({ message, setMessage, handleSendMessage, disabled }) {
    
  return (
    <div className="flex items-center gap-4 px-8 py-4 border-t bg-white">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
        disabled={disabled}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition"
        onClick={handleSendMessage}
        disabled={disabled || !message.trim()}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}

export default MessageInput;
