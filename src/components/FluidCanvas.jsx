import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Center, Float } from '@react-three/drei';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';

const SATOSHI_BLACK = "https://cdn.fontshare.com/wf/NHPGVFYUXYXE33DZ75OIT4JFGHITX5PE/PSUTMASCDJTVPERDYJZPN23BVUFUCQIF/J64QX5IPOHK56I2KYUNBQ5M2XWZEYKYX.ttf";
const PIXELIFY_URL = "https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf";
const NEWSREADER_URL = "https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADA.ttf";
function Scene() {
  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Center top position={[0, 0, -10]}>
        <Text
          font={SATOSHI_BLACK}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Hi
        </Text>
      </Center>

      <Center bottom position={[0, 0, -10]}>
        <Text
          font={NEWSREADER_URL}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          I am Alen Koikkara.        
        </Text>
      </Center>

      <Center bottom position={[0, 0, -10]}>
        <Text
          font={NEWSREADER_URL}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          I Like to create.        
        </Text>
      </Center>

      <EffectComposer>
        <Fluid
          intensity={0.5}
          force={1}
          distortion={0.1}
          curl={0.1}
          radius={0.25}
          swirl={1}
          blend={1}
          showBackground={true}
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
        camera={{ position: [0, 0, 0], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
