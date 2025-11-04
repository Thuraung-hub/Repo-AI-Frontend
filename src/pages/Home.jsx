import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();

  // Simulate backend user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Mock backend data (can later be replaced with an API fetch)
    const mockData = {
      username: 'aungthuphyo',
      isConnected: true,
      repoCount: 12,
      repositories: [
        { id: 1, name: 'RepoAI-Frontend', branch: 'main' },
        { id: 2, name: 'RepoAI-Backend', branch: 'dev' },
        { id: 3, name: 'AI-Playground', branch: 'main' }
      ]
    };

    // Simulate loading delay like fetching from backend
    setTimeout(() => {
      setUserData(mockData);
    }, 800);
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-[#121212]">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-neutral-800 m-[5%]">
        <h1 className="text-3xl font-bold mb-2 text-[#FFFFFF] m-[0px]">
          Welcome, @{userData.username}
        </h1>
        <p className="text-orange-400 text-[#FFA500] my-5">
          {userData.isConnected
            ? `Connected to GitHub • ${userData.repoCount} repositories ready to analyze`
            : 'Not connected to GitHub'}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <div className="mb-[75px]">
            <h2 className="text-[35px] font-bold leading-tight text-[#FFFFFF] m-5">
              Welcome to Repo AI
            </h2>
            <p className="text-[35px] text-gray-300 mb-10 text-[#FFFFFF] mb-20">
              Your AI-Powered Code Refactoring Assistant
            </p>
          </div>

          <button
            onClick={() => navigate('/init-chat', { state: { repos: userData.repositories } })}
            className="gap-2 bg-[#FFA500] hover:bg-yellow-600 text-black font-bold p-3 rounded-[10px] inline-flex items-center transition-colors text-lg mb-[30px]"
          >
            <Plus className="w-6 h-6" />
            <div className="font-[700] text-[20px]">Create a new chat</div>
          </button>

          <p className="text-orange-400 text-[#FFA500]">
            Pick a repository and branch to analyze your code
          </p>
        </div>

        {/* Optional Repository Preview */}
        {/* <div className="mt-10 text-left">
          <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
          <ul className="space-y-1 text-gray-300">
            {userData.repositories.map((repo) => (
              <li key={repo.id}>
                <span className="font-medium">{repo.name}</span> — branch: {repo.branch}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
