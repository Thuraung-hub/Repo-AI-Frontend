import React, { useState, useEffect } from "react";
import { Coffee } from "lucide-react";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4 text-[#FFFFFF]">
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

        {/* Subtext */}
        <p className="text-lg text-gray-300 mb-8">
          Please wait while we analyze your repository. This may take a few minutes.
        </p>

        {/* Progress Section */}
        <div className="max-w-2xl mx-auto mb-4 flex items-center gap-4">
          {/* Bar Container */}
          <div className="flex-1 bg-[#222222] rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#FFA500] h-full rounded-full transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage */}
          <div className="text-white text-sm font-semibold w-12 text-right">
            {progress}%
          </div>
        </div>

        {/* Status Message */}
        <p className="text-gray-400 text-base mt-2">
          {progress < 100 ? "Analyzing..." : "Analysis complete!"}
        </p>
      </div>
    </div>
  );
}
