import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Center, ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';

// Font URLs
const SATOSHI_BOLD = "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf";
const NEWSREADER_BOLD = "https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wn4jADA.ttf";
const PIXELIFY_URL = "https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf";

// Asset Imports
import archUrl from '../assets/arch.png';
import glassUrl from '../assets/glass.png';
import uiUrl from '../assets/ui.png';
import techUrl from '../assets/tech.png';

function Scene() {
  const scroll = useScroll();
  const fluidRef = useRef();
  const { viewport } = useThree();
  const [p1Width, setP1Width] = useState(0);
  const [p2Width, setP2Width] = useState(0);
  const [useSatoshiForO, setUseSatoshiForO] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUseSatoshiForO(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (fluidRef.current) {
      // Map scroll velocity to fluid distortion intensity and force
      const velocity = scroll.velocity;
      fluidRef.current.intensity = 0.5 + velocity * 2;
      fluidRef.current.force = 1 + velocity * 5;
    }
  });

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Scroll>
        {/* Section 1: Hero Text */}
        <Center key={viewport.width} position={[-1.5, .4, -2]}>
          <Text
            font={SATOSHI_BOLD}
            fontSize={.36}
            color="black"
            anchorX="left"
            anchorY="middle"
            textAlign="left"
            position={[0, 1, 0]}
          >
            Hi !
          </Text>
          <Text
            font={NEWSREADER_BOLD}
            fontSize={.64}
            color="black"
            anchorX="left"
            anchorY="middle"
            textAlign="left"
            position={[0, .4, 0]}
          >
            I am Alen Koikkara.
          </Text>
          <group position={[0, -0.2, 0]}>
            <Text
              font={SATOSHI_BOLD}
              fontSize={0.48}
              color="#10110E"
              anchorX="left"
              anchorY="middle"
              textAlign="left"
              onSync={(m) => {
                m.geometry.computeBoundingBox();
                setP1Width(m.geometry.boundingBox.max.x - 0.01);
              }}
            >
              I like t
            </Text>
            <Text
              font={useSatoshiForO ? SATOSHI_BOLD : PIXELIFY_URL}
              fontSize={useSatoshiForO ? 0.40 : 0.42}
              color="black"
              anchorX="left"
              anchorY="middle"
              textAlign="left"
              position={[p1Width, useSatoshiForO ? -0.04 : -0.05, 0]}
            >
              o
            </Text>
            <Text
              font={SATOSHI_BOLD}
              fontSize={0.48}
              color="black"
              anchorX="left"
              anchorY="middle"
              textAlign="left"
              position={[p1Width + p2Width + 0.35, -.01, 0]}
            >
              create.
            </Text>
          </group>
        </Center>

        {/* Section 2: Architecture */}
        <Image 
          url={archUrl} 
          position={[0, -viewport.height, -5]} 
          scale={[viewport.width * 0.7, viewport.height * 0.7]} 
          transparent
          opacity={0.9}
        />

        {/* Section 3: Glass Art */}
        <Image 
          url={glassUrl} 
          position={[0, -viewport.height * 2, -5]} 
          scale={[viewport.width * 0.7, viewport.height * 0.7]} 
          transparent
          opacity={1}
        />

        {/* Section 4: UI Design */}
        <Image 
          url={uiUrl} 
          position={[0, -viewport.height * 3, -5]} 
          scale={[viewport.width * 0.7, viewport.height * 0.7]} 
          transparent
          opacity={0.9}
        />

        {/* Section 5: Tech Art */}
        <Image 
          url={techUrl} 
          position={[0, -viewport.height * 4, -5]} 
          scale={[viewport.width * 0.7, viewport.height * 0.7]} 
          transparent
          opacity={0.9}
        />
      </Scroll>

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
    <div className="fixed inset-0 w-full h-full bg-background">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
