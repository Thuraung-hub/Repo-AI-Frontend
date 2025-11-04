import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearHistoryModal from "../components/ClearHistoryModel";// ✅ import modal

export default function Profile() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate();

  // ✅ Centralized user data (can replace later with backend data)
  const userData = {
    name: "Sophia Chen",
    role: "GitHub User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    historyCount: 5,
  };

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF]">
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl font-bold text-white">Profile</h1>

          {/* Profile Card */}
          <div className="rounded-lg p-8 my-[40px]">
            <div className="flex flex-col items-center">
              <div className="w-[20%] h-[20%] rounded-full mb-4 overflow-hidden bg-[#FFC285] my-4">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl text-white font-semibold mt-8 mb-2">
                {userData.name}
              </h2>
              <p className="text-[#FFA500] mb-6">{userData.role}</p>

              <button
                onClick={() => navigate("/login")}
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
                <p className="text-sm mb-1" style={{ color: "#FFA500" }}>
                  This will permanently delete all {userData.historyCount} refactoring sessions.
                </p>
                <p className="text-sm" style={{ color: "#FFA500" }}>
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

      {/* ✅ Modal Component */}
      {showClearConfirm && (
        <ClearHistoryModal
          onCancel={() => setShowClearConfirm(false)}
          onConfirm={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}
