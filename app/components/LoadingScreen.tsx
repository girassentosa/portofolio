"use client";

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Set black background untuk prevent flash
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    document.body.style.overflow = 'hidden';
    
    // Loading duration 1 second
    const totalDuration = 1000;
    const steps = 100;
    const intervalTime = totalDuration / steps;
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
        document.body.style.overflow = '';
        // Small delay before calling onLoadComplete for smooth transition
        setTimeout(() => onLoadComplete(), 200);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <div
      data-loading-screen="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-200 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center gap-6" suppressHydrationWarning>
        {/* Loading spinner - optimized */}
        <div className="relative w-12 h-12" suppressHydrationWarning>
          <div className="absolute inset-0 border-3 border-purple-500/20 rounded-full" suppressHydrationWarning></div>
          <div
            className="absolute inset-0 border-3 border-transparent border-t-purple-500 rounded-full animate-spin"
            style={{ animationDuration: '0.8s', willChange: 'transform' }}
            suppressHydrationWarning
          ></div>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden" suppressHydrationWarning>
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
            suppressHydrationWarning
          ></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white/60 text-sm font-medium" suppressHydrationWarning>
          Loading... {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

