import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#121212]  text-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-neutral-800 m-[5%]">
        <h1 className="text-3xl font-bold mb-2 text-[#FFFFFF] m-[0px]">Welcome, @github-username</h1>
        <p className="text-orange-400 text-[#FFA500] m-[5px]">
          Connected to GitHub • 12 repositories ready to analyze
        </p>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <div className='mb-[75px]'>
            <h2 className="text-[35px] font-bold mb-4 leading-tight text-[#FFFFFF] m-[15px]">
              Welcome to Repo AI
            </h2>
            <p className="text-[35px] text-gray-300 mb-10 text-[#FFFFFF] m-[15px]">
              Your AI-Powered Code Refactoring Assistant
            </p>
          </div>
          <button 
            onClick={() => navigate('/init-chat')}
            className="bg-[#FFA500] hover:bg-yellow-600 text-black font-bold py-[10px] px-[10px] rounded-[10px] inline-flex items-center gap-3 transition-colors text-lg mb-[30px]"
          >
            <Plus className="w-6 h-6 mr-[5px]" />
           <div className="font-[700] text-[20px] mr-[5px]">
              Create a new chat
            </div> 
          </button>

          <p className="text-orange-400 text-[#FFA500]">
            Pick a repository and branch to analyze your code
          </p>
        </div>
      </div>
    </div>
  );
}