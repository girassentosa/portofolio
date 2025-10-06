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
        // Mobile - SAMA dengan desktop tapi static (no animation)
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 16,
          beamNumber: 6, // SAMA dengan desktop
          lightColor: '#ffffff',
          speed: 0, // NO animation - static beams
          noiseIntensity: 1.4, // SAMA dengan desktop
          scale: 0.23, // SAMA dengan desktop
          rotation: -25
        });
      } else if (width < 1024) {
        // Tablet - SAMA dengan desktop tapi static
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 16,
          beamNumber: 6, // SAMA dengan desktop
          lightColor: '#ffffff',
          speed: 0, // NO animation - static beams
          noiseIntensity: 1.4, // SAMA dengan desktop
          scale: 0.23, // SAMA dengan desktop
          rotation: -25
        });
      } else {
        // Desktop - Static beams (no animation)
        setBeamConfig({
          beamWidth: 3,
          beamHeight: 16,
          beamNumber: 6,
          lightColor: '#ffffff',
          speed: 0, // NO animation - static beams
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

