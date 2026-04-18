import React, { useState, useEffect } from 'react';
import { Text, Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRandomToggle } from '../../hooks/useRandomToggle';

// Font URLs
const SATOSHI_BOLD = "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf";
const NEWSREADER_BOLD = "https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wn4jADA.ttf";
const PIXELIFY_URL = "https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf";

export default function HeroSection({ position = [0, 0, 0] }) {
  const { viewport } = useThree();
  const [p1Width, setP1Width] = useState(0);
  const useSatoshiForO = useRandomToggle(800, 1500);

  return (
    <group position={position}>
      <Center 
        key={viewport.width} 
        position={[-2.1, 0.4, -2]} 
        scale={Math.min(1, viewport.width / 5)}
      >
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
            position={[p1Width + 0.35, -.01, 0]}
          >
            create.
          </Text>
        </group>
      </Center>
    </group>
  );
}
