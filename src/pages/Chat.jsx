import React, { useState } from 'react';
import { Menu, Plus, User, Coffee } from 'lucide-react';

const ChatHistory = () => {
  const [activeNav, setActiveNav] = useState('chat-history');

  const chatSessions = [
    { id: 1, repository: 'Project Alpha', date: '2024-01-15', summary: 'View Details' },
    { id: 2, repository: 'Project Beta', date: '2024-02-20', summary: 'View Details' },
    { id: 3, repository: 'Project Gamma', date: '2024-03-25', summary: 'View Details' },
    { id: 4, repository: 'Project Delta', date: '2024-04-30', summary: 'View Details' },
    { id: 5, repository: 'Project Epsilon', date: '2024-05-05', summary: 'View Details' }
  ];

  const navItems = [
    { id: 'new-chat', label: 'New Chat', icon: Plus },
    { id: 'chat-history', label: 'Chat History', icon: Menu },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="flex h-screen bg-black text-[#FFFFFF] p-6 bg-[#121212]">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 px-12 py-10">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold mb-2">Chat History</h2>
            <p className="text-orange-400 text-base text-[#FFA500]">
              You've completed <span className="font-semibold">5</span> refactoring sessions • Select one to review
            </p>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-[#222222] border-b border-gray-800 rounded-t-lg">
              <div className="col-span-5 text-gray-300 font-semibold text-base">Repository</div>
              <div className="col-span-3 text-gray-300 font-semibold text-base">Date</div>
              <div className="col-span-4 text-gray-300 font-semibold text-base">Summary</div>
            </div>

            {/* Table Rows */}
            {chatSessions.map((session, index) => (
              <div
                key={session.id}
                className={`grid grid-cols-12 gap-4 px-8 py-6 cursor-pointer transition-colors
                  ${
                    index !== chatSessions.length - 1
                      ? 'border-b border-gray-800 hover:bg-[#222222]'
                      : 'hover:bg-[#222222]'
                  }`}
              >
                <div className="col-span-5 font-normal text-white">{session.repository}</div>
                <div className="col-span-3 text-gray-400">{session.date}</div>
                <div className="col-span-4 text-white font-semibold">{session.summary}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatHistory;
