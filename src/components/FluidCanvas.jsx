import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Center, ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';

// Font URLs
const SATOSHI_BLACK = "https://cdn.fontshare.com/wf/NHPGVFYUXYXE33DZ75OIT4JFGHITX5PE/PSUTMASCDJTVPERDYJZPN23BVUFUCQIF/J64QX5IPOHK56I2KYUNBQ5M2XWZEYKYX.ttf";
const NEWSREADER_URL = "https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADA.ttf";
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
        <Center top position={[0, 0, -10]}>
          <Text
            font={SATOSHI_BLACK}
            fontSize={1.2}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Hi
          </Text>
        </Center>

        <Center bottom position={[0, -1.5, -10]}>
          <Text
            font={NEWSREADER_URL}
            fontSize={0.8}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={viewport.width * 0.8}
            textAlign="center"
          >
            I am Alen Koikkara. I Like to create.
          </Text>
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
          curl={0.1}
          radius={0.25}
          swirl={1}
          blend={1}
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
