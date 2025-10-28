import React, { useState } from 'react';
import { Search, Plus, Menu, User, ChevronDown } from 'lucide-react';

export default function RepoSelector() {
  const [step, setStep] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const repositories = [
    { name: 'Ai Project', visibility: 'Public', lastUpdated: '2 weeks ago' },
    { name: 'Browser extension project', visibility: 'Private', lastUpdated: '1 month ago' },
    { name: 'Mental health care project', visibility: 'Public', lastUpdated: '3 weeks ago' },
    { name: 'Sentiment analysis project', visibility: 'Private', lastUpdated: '2 months ago' },
    { name: 'Inventory System', visibility: 'Public', lastUpdated: '1 week ago' },
  ];

  const branches = ['main', 'develop', 'feature/new-ui', 'bugfix/inventory-fix', 'release/v2.0'];

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || repo.visibility === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setStep(2);
  };

  const handleStartRefactoring = () => {
    if (selectedBranch) {
      alert(`Starting refactoring on ${selectedRepo.name} - Branch: ${selectedBranch}`);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF]">
      {/* Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {step === 1 ? (
          <>
            {/* Step 1: Select Repository */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Step 1 of 2: Select Repository</h2>
              <div className="flex gap-2 mb-6">
                <div className="flex-1 h-2 bg-orange-500 rounded"></div>
                <div className="flex-1 h-2 bg-zinc-800 rounded"></div>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Find repositories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-3 mb-6">
              {['All', 'Public', 'Private'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-lg font-medium bg-[#212121] transition ${
                    activeFilter === filter
                      ? 'bg-[#FFA500] text-[#FFFFFF] '
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="bg-zinc-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 font-medium text-gray-400">Repository</th>
                    <th className="text-left p-4 font-medium text-gray-400">Visibility</th>
                    <th className="text-left p-4 font-medium text-gray-400">Last Updated</th>
                    <th className="text-left p-4 font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepos.map((repo, index) => (
                    <tr
                      key={index}
                      className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                    >
                      <td className="p-4">{repo.name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
                          {repo.visibility}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{repo.lastUpdated}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleSelectRepo(repo)}
                          className="text-orange-500 hover:text-orange-400 font-medium"
                        >
                          Refactor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Select Branch */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4" style={{ color: '#d4a574' }}>
                Step 2 of 2: Select Branch
              </h2>
              <div className="flex gap-2 mb-6">
                <div className="flex-1 h-2 bg-orange-500 rounded"></div>
                <div className="flex-1 h-2 bg-orange-500 rounded"></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Repository</h3>
              <div className="bg-zinc-900 p-4 rounded-lg max-w-2xl">
                <p className="text-lg">{selectedRepo?.name}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Branch</h3>
              <div className="relative max-w-2xl">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-zinc-900 text-white px-4 py-4 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex gap-4 justify-end max-w-2xl">
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-lg border-2 border-zinc-700 hover:border-zinc-600 transition font-medium"
              >
                Back
              </button>
              <button 
                onClick={handleStartRefactoring}
                disabled={!selectedBranch}
                className={`px-8 py-3 rounded-lg font-medium transition ${
                  selectedBranch 
                    ? 'bg-orange-500 hover:bg-orange-600 text-black' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                Start Refactoring
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}