import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate(); // ✅ Correct hook usage

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF]">


      {/* Main Content */}
      <div className="flex-1 overflow-auto" >
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl text- white font-bold">Profile</h1>

          {/* Profile Card */}
          <div className="rounded-lg p-8 my-[40px]">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-[20%] h-[20%] rounded-full mb-4 overflow-hidden bg-[#FFC285] my-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Role */}
              <h2 className="text-2xl  text-white font-semibold mt-8 mb-4">Sophia Chen</h2>
              <p className="text-[#FFA500] mb-4">GitHub User</p>

              {/* Logout Button */}
             
{/* ✅ Logout works now */}
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
                <p className="text-sm mb-1" style={{ color: '#FFA500' }}>
                  Manage the permissions This will permanently delete all 5 refactoring sessions.
                </p>
                <p className="text-sm" style={{ color: '#FFA500' }}>
                  This action cannot be undone.
                </p>
              </div>
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="text-[#FFFFFF] bg-[#343A40] p-[8px] rounded-[10px] font-medium transition-colors whitespace-nowrap"
              >
                Clear History
              </button>
            </div>
          
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
     {showClearConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="rounded-lg p-6 max-w-md w-full bg-[#212121]">
      <h3 className="text-xl font-semibold mb-4">Confirm Clear History</h3>
      <p className="text-gray-300 mb-6">
        Are you sure you want to delete all refactoring sessions? This action cannot be undone.
      </p>
      
      <div className="flex gap-3 justify-end">
        {/* ❌ Cancel Button */}
        <button
          onClick={() => setShowClearConfirm(false)}
          className="px-[15px] py-[3px] rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
        >
          Cancel
        </button>

        {/* ✅ Clear History Button */}
        <button
          onClick={() => {
            setShowClearConfirm(false);
            navigate('/chat-history', { state: { clear: true } });
          }}
          className="px-[15px] py-[3px] rounded-lg bg-[#FFA500] text-[#000000] hover:bg-[#ffb733] transition"
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
