import React from 'react';
import { Menu, Plus, User, MessageSquare } from 'lucide-react';

export default function SidebarLayout(){
  return (
    <div className="h-screen p-4 flex flex-col bg-neutral-900 text-white">
      <div className="w-70 h-screen p-4 flex flex-col" style={{ backgroundColor: '#212121' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
            <MessageSquare className="w-6 h-6" style={{ color: '#FFFFFF' }} />
          </div>
          <span className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>Repo AI</span>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors hover:opacity-80" style={{ color: '#FFFFFF', backgroundColor: 'transparent' }}>
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors hover:opacity-80" style={{ color: '#FFFFFF', backgroundColor: 'transparent' }}>
          <Menu className="w-5 h-5" />
          <span>Chat History</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{ color: '#FFFFFF', backgroundColor: '#404040' }}>
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}