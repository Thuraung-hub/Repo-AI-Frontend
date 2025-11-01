import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatHistory = () => {
  const location = useLocation();

  const [chatSessions, setChatSessions] = useState([
    { id: 1, repository: 'Project Alpha', date: '2024-01-15', summary: 'View Details' },
    { id: 2, repository: 'Project Beta', date: '2024-02-20', summary: 'View Details' },
    { id: 3, repository: 'Project Gamma', date: '2024-03-25', summary: 'View Details' },
    { id: 4, repository: 'Project Delta', date: '2024-04-30', summary: 'View Details' },
    { id: 5, repository: 'Project Epsilon', date: '2024-05-05', summary: 'View Details' }
  ]);

 // ✅ FIX: Added effect to detect state and clear sessions
  useEffect(() => {
    if (location.state?.clear) {
      setChatSessions([]); // Clears the table
    }
  }, [location.state]);

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF] p-6">
      <main className="flex-1 p-[5%]">
        <div className="max-w-6xl">
          <h2 className="text-4xl font-extrabold mb-2">Chat History</h2>
          <p className="text-[#FFA500]">
            You've completed <span className="font-semibold">{chatSessions.length}</span> refactoring sessions.
          </p>

          {/* ❌ Original Error: When table is empty, nothing was displayed → looked like white screen */}
          {/* ✅ FIX: Added empty state message */}
          <div className="bg-[#212121] border border-[#404040] rounded-lg overflow-hidden mt-6">
            <div className="p-[20px] grid grid-cols-12 gap-4 bg-[#404040] rounded-t-lg font-semibold text-gray-300">
              <div className="col-span-5">Repository</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-4">Summary</div>
            </div>

            {chatSessions.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No chat history available.
              </div>
            ) : (
              chatSessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`grid grid-cols-12 gap-4 p-[20px] cursor-pointer ${
                    index !== chatSessions.length - 1 ? 'border-b border-gray-800' : ''
                  }`}
                >
                  <div className="col-span-5 text-white">{session.repository}</div>
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
