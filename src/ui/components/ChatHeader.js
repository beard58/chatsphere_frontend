import React from 'react';

function ChatHeader({ selectedChat }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        {selectedChat && (
          <div>
            <div className="font-semibold text-gray-800">{selectedChat.fullName}</div>
            <div className="text-xs text-gray-500">{selectedChat.email} | {selectedChat.mobileNumber}</div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-gray-200 p-2 rounded-full">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="#555" />
          </svg>
        </button>
        <button className="hover:bg-gray-200 p-2 rounded-full">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <rect x="6" y="11" width="12" height="2" rx="1" fill="#555" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
