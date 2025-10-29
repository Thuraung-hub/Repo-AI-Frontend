import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus, User, MessageSquare } from 'lucide-react';

export default function Profile() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto mx-[5%]">
        <div className="max-w-3xl mx-auto p-8">
          <h1 className="text-3xl font-bold">Profile</h1>

          {/* Profile Card */}
          <div className="rounded-lg p-8 my-[40px]">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-[20%] h-[20%] rounded-full mb-4 overflow-hidden bg-[#FFC285] m-[10px]">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Role */}
              <h2 className="text-2xl text-white font-semibold">Sophia Chen</h2>
              <p className="text-[#FFA500] mt-[0px]">GitHub User</p>

              {/* ✅ Logout Button */}
              <button
                onClick={() => navigate('/login')}
                className="my-[10px] bg-[#343A40] text-[#FFFFFF] w-[50%] max-w-md py-[1%] rounded-[10px] font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Clear History Section */}
          <div className="rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Clear All History?</h3>
                <p className="text-sm mb-1 text-[#FFA500]">
                  This will permanently delete all 5 refactoring sessions.
                </p>
                <p className="text-sm text-[#FFA500]">
                  This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-[#FFFFFF] bg-[#343A40] px-[10px] py-[10px] rounded-[10px] font-medium transition-colors whitespace-nowrap ml-4"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 max-w-md w-full mx-4 bg-[#212121] py-[5%] px-[5%]">
            <h3 className="text-xl font-semibold mb-4">Confirm Clear History</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete all 5 refactoring sessions? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-[30px] py-[3px] m-[5px] rounded-lg transition-colors bg-[#343A40] text-[#FFFFFF]"
              >
                Cancel
              </button>

              {/* ✅ FIXED: This line now triggers clearing chat history */}
              <button
                onClick={() => {
                  setShowClearConfirm(false);
                  navigate('/chat', { state: { clear: true } }); // <-- Added this
                }}
                className="px-[15px] py-[3px] m-[5px] rounded-lg transition-colors bg-[#FFA500] text-[#000000]"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
