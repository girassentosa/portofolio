"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Beams = dynamic(() => import('./Beams'), { 
  ssr: false
});

const ResponsiveBeams = () => {
  const [beamConfig, setBeamConfig] = useState({
    beamWidth: 3,
    beamHeight: 18,
    beamNumber: 12,
    lightColor: '#ffffff',
    speed: 2,
    noiseIntensity: 1.75,
    scale: 0.2,
    rotation: -25
  });

  useEffect(() => {
    const updateBeamConfig = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile - OPTIMIZED: Reduced beams for better performance
        setBeamConfig({
          beamWidth: 2,
          beamHeight: 12,
          beamNumber: 4, // Reduced from 6
          lightColor: '#ffffff',
          speed: 1.2, // Slower = less GPU usage
          noiseIntensity: 1.3,
          scale: 0.28,
          rotation: -25
        });
      } else if (width < 1024) {
        // Tablet - OPTIMIZED
        setBeamConfig({
          beamWidth: 2.5,
          beamHeight: 14,
          beamNumber: 6, // Reduced from 8
          lightColor: '#ffffff',
          speed: 1.5,
          noiseIntensity: 1.4,
          scale: 0.24,
          rotation: -25
        });
      } else {
        // Desktop - OPTIMIZED: Balanced performance & visuals
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 16,
          beamNumber: 8, // Reduced from 12 for better performance
          lightColor: '#ffffff',
          speed: 1.6, // Reduced speed = less GPU work
          noiseIntensity: 1.5,
          scale: 0.22,
          rotation: -25
        });
      }
    };

    // Initial config
    updateBeamConfig();

    // Update on resize
    window.addEventListener('resize', updateBeamConfig);
    
    return () => window.removeEventListener('resize', updateBeamConfig);
  }, []);

  return (
    <Beams
      beamWidth={beamConfig.beamWidth}
      beamHeight={beamConfig.beamHeight}
      beamNumber={beamConfig.beamNumber}
      lightColor={beamConfig.lightColor}
      speed={beamConfig.speed}
      noiseIntensity={beamConfig.noiseIntensity}
      scale={beamConfig.scale}
      rotation={beamConfig.rotation}
    />
  );
};

export default ResponsiveBeams;

