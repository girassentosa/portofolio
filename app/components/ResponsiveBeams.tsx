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
        // Mobile - ULTRA OPTIMIZED: Minimal beams untuk performance maksimal
        setBeamConfig({
          beamWidth: 2,
          beamHeight: 8,
          beamNumber: 2, // Further reduced to 2 untuk mobile performance
          lightColor: '#ffffff',
          speed: 0.5, // Much slower untuk save GPU
          noiseIntensity: 0.8, // Reduced noise
          scale: 0.35,
          rotation: -25
        });
      } else if (width < 1024) {
        // Tablet - OPTIMIZED
        setBeamConfig({
          beamWidth: 2.5,
          beamHeight: 12,
          beamNumber: 4, // Reduced
          lightColor: '#ffffff',
          speed: 1.0,
          noiseIntensity: 1.2,
          scale: 0.28,
          rotation: -25
        });
      } else {
        // Desktop - OPTIMIZED: Balanced performance & visuals
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 16,
          beamNumber: 6, // Reduced dari 7
          lightColor: '#ffffff',
          speed: 1.3, // Reduced speed
          noiseIntensity: 1.4,
          scale: 0.23,
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

