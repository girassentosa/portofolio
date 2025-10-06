"use client";

import { useState, ReactNode, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  // Check if user has visited before
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited');
      return !hasVisited; // Skip loading if already visited this session
    }
    return true;
  });
  const [showContent, setShowContent] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasVisited') === 'true';
    }
    return false;
  });

  const handleLoadComplete = () => {
    // Mark as visited
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasVisited', 'true');
    }
    // Smooth transition
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 300);
  };

  useEffect(() => {
    // Ensure body stays black during transition
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    
    // If already visited, skip loading screen immediately
    if (!isLoading && showContent) {
      document.body.style.opacity = '1';
    }
  }, [isLoading, showContent]);

  return (
    <>
      {/* Loading Screen with 5-7 seconds duration */}
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

