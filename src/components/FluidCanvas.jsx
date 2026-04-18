import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './Sections/HeroSection';
import Ketto from './Sections/Ketto';
import Memento from './Sections/Memento';

import archUrl from '../assets/arch.png';

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
        <HeroSection position={[0, 0, 0]} />
        <Ketto 
          position={[0, -viewport.height, 0]} 
          headerPre="I l"
          headerPost="ve whitespaces."
          imageUrl={archUrl} // Using archUrl placeholder or actual image URL you have
          titlePre="Ketto"
          titlePost=""
          subtitle="Crowdfunding Platform"
        />
        <Memento
          position={[0, -viewport.height * 2, 0]} 
          imageUrl={archUrl} // Using archUrl placeholder or actual image URL you have
          titlePre="Memento"
          titlePost=""
          subtitle="Knowledge Graph"
        />
      </group>

      <EffectComposer>
        <Fluid
          ref={fluidRef}
          intensity={0.5}
          force={1}
          distortion={0.1}
          curl={0.2}
          radius={0.25}
          swirl={2}
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
