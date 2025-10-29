import React, { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); // ✅ get navigate function

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // ✅ Navigate after small delay (optional)
          setTimeout(() => {
            navigate("/chat-box"); // <-- replace with your route
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-[5%] text-[#FFFFFF] animate-fade-in">
      <div className="text-center max-w-3xl w-full">
        {/* Coffee Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 bg-neutral-900 rounded-2xl flex items-center justify-center animate-pulse">
            <Coffee className="w-24 h-24 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          Analyzing your repository
        </h1>

        {/* Status Message */}
        <div className="flex justify-end m-[0px]">
          <p className="text-gray-400 text-base mt-2">
            {progress < 100 ? "Analyzing..." : "Analysis complete"}
          </p>
        </div>

        {/* Progress Section */}
        <div className="max-w-2xl mx-auto mb-4 flex items-center gap-4">
          <div className="flex-1 bg-[#222222] rounded-full h-[15px] overflow-hidden my-[5px]">
            <div
              className="h-full rounded-full transition-all duration-200 ease-linear bg-[#FFA500] shadow-[0_0_10px_#FFA500]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="ml-[10px] text-white text-sm font-semibold w-12 text-right">
            {progress}%
          </div>
        </div>

        {/* Additional text */}
        <p className="text-lg text-[#FFA500] mb-8">
          Please wait while we analyze your repository. This may take a few minutes.
        </p>
      </div>
    </div>
  );
}
