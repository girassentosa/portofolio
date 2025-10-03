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
        // Mobile - Beams miring diagonal
        setBeamConfig({
          beamWidth: 2,
          beamHeight: 14,
          beamNumber: 6,
          lightColor: '#ffffff',
          speed: 1.5,
          noiseIntensity: 1.5,
          scale: 0.25,
          rotation: -25
        });
      } else if (width < 1024) {
        // Tablet - Beams miring diagonal
        setBeamConfig({
          beamWidth: 2.5,
          beamHeight: 16,
          beamNumber: 8,
          lightColor: '#ffffff',
          speed: 1.8,
          noiseIntensity: 1.6,
          scale: 0.22,
          rotation: -25
        });
      } else {
        // Desktop - Beams miring diagonal melintang
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 18,
          beamNumber: 12,
          lightColor: '#ffffff',
          speed: 2,
          noiseIntensity: 1.75,
          scale: 0.2,
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

