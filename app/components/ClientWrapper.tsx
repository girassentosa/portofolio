"use client";

import { useState, ReactNode, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  // Always show loading screen on every page load (1 second)
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    // Smooth transition after loading complete
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 300);
  };

  useEffect(() => {
    // Ensure body stays black during transition
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
  }, []);

  return (
    <>
      {/* Loading Screen with 1 second duration */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      {/* Main Content - fade in smoothly */}
      <div 
        className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        suppressHydrationWarning
      >
        {children}
      </div>
    </>
  );
};

export default ClientWrapper;

