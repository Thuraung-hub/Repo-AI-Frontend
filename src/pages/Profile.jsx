export default function Profile() {
  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      {/* Profile Header */}
        <h1 className="text-3xl font-bold text-[#FFFFFF] m-[5%]">Profile</h1>
      
      {/* Profile Content */}
      <div className="flex-1 px-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-white mx-auto mb-6 overflow-hidden rounded-[10px] bg-gray-800 p-4 text-white ">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" 
                alt="Profile" 
                className="w-[15%] h-[15%] object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Sophia Chen</h2>
            <p className="text-[#FFA500] text-lg">GitHub User</p>
            
            <button className="mt-6 bg-[#404040] hover:bg-neutral-600 px-24 py-[5px] rounded-lg font-medium w-[30%]">
              Logout
            </button>
          </div>
          {/* Clear History Section */}
          <div className="bg-neutral-900/50 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFFFFF]">Clear All History?</h3>
                <p className="text-[#FFA500] mb-1">
                  Manage the permissions This will permanently delete all 5 refactoring sessions.
                </p>
                <p className="text-[#FFA500]">
                  This action cannot be undone.
                </p>
              </div>
              <button className="bg-[#404040] hover:bg-neutral-600 px-8 py-2.5 rounded-lg font-medium whitespace-nowrap ml-6 transition-colors">
                Clear History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}