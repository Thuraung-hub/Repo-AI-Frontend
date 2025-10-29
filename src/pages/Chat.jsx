import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Plus, User, Coffee } from 'lucide-react';

const ChatHistory = () => {
  const location = useLocation();

  const [chatSessions, setChatSessions] = useState([
    { id: 1, repository: 'Project Alpha', date: '2024-01-15', summary: 'View Details' },
    { id: 2, repository: 'Project Beta', date: '2024-02-20', summary: 'View Details' },
    { id: 3, repository: 'Project Gamma', date: '2024-03-25', summary: 'View Details' },
    { id: 4, repository: 'Project Delta', date: '2024-04-30', summary: 'View Details' },
    { id: 5, repository: 'Project Epsilon', date: '2024-05-05', summary: 'View Details' }
  ]);

  // ✅ This clears only the table data
  const clearChatSessions = () => {
    setChatSessions([]);
  };

  // ✅ Detect if Profile page requested a clear
  useEffect(() => {
    if (location.state?.clear) {
      clearChatSessions();
    }
  }, [location.state]);

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF] p-6">
      <main className="flex-1 p-[5%]">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-8 px-[10px]">
            <h2 className="text-4xl font-extrabold mb-2">Chat History</h2>
            <p className="text-orange-400 text-base text-[#FFA500]">
              You've completed{' '}
              <span className="font-semibold">{chatSessions.length}</span> refactoring sessions • Select one to review
            </p>
          </div>

          {/* Table */}
          <div className="bg-[#212121] border border-[#404040] rounded-lg overflow-hidden m-[25px] m-[10%]">
            {/* Table Header */}
            <div className="p-[20px] font-[900] grid grid-cols-12 gap-4 px-8 py-5 bg-[#404040] rounded-t-lg">
              <div className="col-span-5 text-gray-300 font-semibold text-base">Repository</div>
              <div className="col-span-3 text-gray-300 font-semibold text-base">Date</div>
              <div className="col-span-4 text-gray-300 font-semibold text-base">Summary</div>
            </div>

            {/* Table Rows or Empty State */}
            {chatSessions.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No chat history available.
              </div>
            ) : (
              chatSessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`grid grid-cols-12 gap-4 p-[20px] cursor-pointer transition-colors ${
                    index !== chatSessions.length - 1
                      ? 'border-b border-gray-800 hover:bg-[#222222]'
                      : 'hover:bg-[#222222]'
                  }`}
                >
                  <div className="col-span-5 font-normal text-white">{session.repository}</div>
                  <div className="col-span-3 text-gray-400">{session.date}</div>
                  <div className="col-span-4 text-white font-semibold">{session.summary}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatHistory;
