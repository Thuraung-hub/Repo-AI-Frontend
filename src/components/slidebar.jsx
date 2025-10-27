import { Coffee, Plus, Menu, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex text-white bg-[#212121]">
      
      {/* Sidebar */}
      <aside className="w-80 p-6 bg-[#212121]">
        {/* Repo AI Header */}
        <div 
          className="flex items-center gap-3 mb-8 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          <span className="text-xl font-semibold text-[#FFFFFF]">Repo AI</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-3">
          {/* New Chat */}
          <button
            onClick={() => navigate('/init-chat')}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl transition-colors 
              bg-[#212121] 
              ${isActive('/init-chat') || isActive('/home') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}
          >
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              bg-[#212121] 
              ${isActive('/init-chat') || isActive('/home') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}>
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-medium text-[#FFFFFF]">New Chat</span>
          </button>

          {/* Chat History */}
          <button
            onClick={() => navigate('/chat')}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl transition-colors 
              bg-[#212121] 
              ${isActive('/chat') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}
          >
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              bg-[#212121] 
              ${isActive('/chat') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}>
              <Menu className="w-5 h-5" />
            </div>
            <span className="font-medium text-[#FFFFFF]">Chat History</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate('/profile')}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl transition-colors 
              bg-[#212121] 
              ${isActive('/profile') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}
          >
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              bg-[#212121] 
              ${isActive('/profile') ? 'bg-[#121212]' : 'hover:bg-[#343A40]'}
            `}>
              <User className="w-5 h-5" />
            </div>
            <span className="font-medium text-[#FFFFFF]">Profile</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
