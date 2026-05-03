import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './Sections/HeroSection';
import Ketto from './Sections/Ketto';
import Memento from './Sections/Memento';
import Shreya from './Sections/Shreya';
import Aanchal from './Sections/Aanchal'; 

import glass from '../assets/glass.png';
import ketto from '../assets/kettobanner.png';
import memento from '../assets/mementoipad.png';



gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const fluidRef = useRef();
  const { viewport } = useThree();
  const sceneRef = useRef();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      snap: {
        snapTo: 1 / 4, // 5 sections, so 4 gaps (25% each)
        duration: { min: 0.2, max: 0.8 },
        ease: "power1.inOut"
      },
      onUpdate: (self) => {
        if (sceneRef.current) {
          // As we scroll down (progress 0->1), move the group up to reveal the sections below
          sceneRef.current.position.y = self.progress * (viewport.height * 4);
        }
        
        // Fluid mapping
        if (fluidRef.current) {
          const velocity = Math.abs(self.getVelocity() / 500);
          fluidRef.current.intensity = 0.5 + velocity * 2;
          fluidRef.current.force = 1 + velocity * 5;
        }
      }
    });

    return () => trigger.kill();
  }, [viewport.height]);

  useFrame(() => {
    // Smoothly decay the fluid distortion when scrolling stops
    if (fluidRef.current) {
      fluidRef.current.intensity = gsap.utils.interpolate(fluidRef.current.intensity, 0.5, 0.05);
      fluidRef.current.force = gsap.utils.interpolate(fluidRef.current.force, 1, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={sceneRef}>
        {[
          { i: 0, x: -2.5, y: 0.5 },
          { i: 1, x: -2.0, y: -0.5 },
          { i: 2, x: 2.0, y: -0.5 },
          { i: 3, x: -2.0, y: -0.5 },
          { i: 4, x: 2.0, y: -0.5 }
        ].map(({ i, x, y }) => (
          <Grid 
            key={i}
            position={[x, -viewport.height * i + y, -5]} 
            rotation={[Math.PI / 2, 0, 0]}
            args={[15, 15]}
            cellSize={0.25} 
            cellThickness={1} 
            cellColor="#f4f4f4" 
            sectionSize={1} 
            sectionThickness={1} 
            sectionColor="#e8e8e8" 
            fadeDistance={3.5} 
            fadeStrength={1.5} 
            followCamera={false}
          />
        ))}
        <HeroSection position={[0, 0, 0]} />
        <Ketto 
          position={[0, -viewport.height, 0]} 
          headerPre="I l"
          headerPost="ve whitespaces."
          imageUrl={ketto} // Using archUrl placeholder or actual image URL you have
          titlePre="Ketto"
          titlePost=""
          subtitle="Crowdfunding Platform"
        />
        <Memento
          position={[0, -viewport.height * 2, 0]} 
          imageUrl={memento} // Using archUrl placeholder or actual image URL you have
          titlePre="Memento"
          titlePost=""
          subtitle="Knowledge Graph"
        />
        <Shreya
          position={[0, -viewport.height * 3, 0]} 
          imageUrl={glass} // Using archUrl placeholder or actual image URL you have
          titlePre="Shreya"
          titlePost=""
          subtitle="Portfolio Website"
        />
        <Aanchal
          position={[0, -viewport.height * 4, 0]} 
          imageUrl={glass} // Using archUrl placeholder or actual image URL you have
          titlePre="Aanchal"
          titlePost=""
          subtitle="Portfolio Website"
        />  
      </group>

      <EffectComposer>
        <Fluid
          ref={fluidRef}
          intensity={0.5}
          force={1}
          distortion={0.3}
          curl={0.6}
          radius={0.55}
          swirl={4}
          blend={2}
          showBackground={false}
          fluidColor="#000000"
        />
      </EffectComposer>
    </>
  );
}

export default function FluidCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full bg-background pointer-events-none z-0">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
