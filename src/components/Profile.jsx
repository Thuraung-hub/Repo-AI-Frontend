import React from 'react';
import { Menu, Plus, User, MessageSquare } from 'lucide-react';

export default function Profile() {
  return (
    <div className="flex-1 p-8" style={{ backgroundColor: '#121212', color: '#FFFFFF' }}>
      <h1 className="text-3xl font-bold mb-12">Profile</h1>

      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFC285' }}>
          <div className="w-full h-full flex items-end justify-center">
            <div className="w-24 h-24 rounded-t-full" style={{ backgroundColor: '#343A40' }}></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-1" style={{ color: '#FFFFFF' }}>Sophia Chen</h2>
        <p className="mb-6" style={{ color: '#808080' }}>GitHub User</p>

        <button className="w-full py-3 px-6 rounded-lg transition-colors hover:opacity-90 mb-16" style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
          Logout
        </button>

        <div className="w-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#FFFFFF' }}>Clear All History?</h3>
              <p className="text-sm mb-1" style={{ color: '#808080' }}>
                <span style={{ color: '#FFA500' }}>Manage the permissions</span> This will permanently delete all 5 refactoring sessions.
              </p>
              <p className="text-sm" style={{ color: '#808080' }}>This action cannot be undone.</p>
            </div>
            <button className="py-2 px-6 rounded-lg transition-colors hover:opacity-90 whitespace-nowrap ml-4" style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}