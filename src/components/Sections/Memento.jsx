import React, { useState } from 'react';
import { Text, Image, Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { usePxToUnit } from '../../hooks/usePxToUnit';

const SATOSHI_BOLD = "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf";
const PIXELIFY_URL = "https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf";
const REGULAR_FONT = "https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.ttf"; // Satoshi Regular

export default function Memento({
  position = [0, 0, 0],
  imageUrl,
  headerPre,
  headerPost,
  titlePre,
  titlePost,
  subtitle
}) {
  const { viewport } = useThree();
  const pxToUnit = usePxToUnit();
  const [headerP1Width, setHeaderP1Width] = useState(0);
  const [titleP1Width, setTitleP1Width] = useState(0);

  // Responsive scaling
  const scale = Math.min(1, viewport.width / 8);

  // Dynamically calculate accurate 3D units for a 64px font size using the reusable hook
  const font64px = pxToUnit(64, scale);
  const font36px = pxToUnit(36, scale);
  const font16px = pxToUnit(16, scale);

  // Image dims - approx 45% of viewport width
  const imgWidth = viewport.width * 0.26;
  const imgHeight = imgWidth * 0.6; // assuming somewhat standard aspect ratio

  return (
    <group position={position}>
      {/* CONTENT: Image on Left, Text on Right */}
      <group position={[0, 0, 0]}>

        {/* Left Side: Title and Subtitle */}
        <group position={[.4, -imgHeight * .60, 0]}>
          <group position={[0, 0.35, 0]}>
            <Text
              font={SATOSHI_BOLD}
              fontSize={font36px}
              color="#10110E"
              anchorX="right"
              anchorY="middle"
            >
              {titlePre}
            </Text>
          </group>

          <Text
            font={REGULAR_FONT}
            fontSize={font16px}
            color="#666666" // Lighter grey for subtitle
            anchorX="right"
            anchorY="middle"
            position={[0, 0.17, 0]}
          >
            {subtitle}
          </Text>
        </group>

        {/* Right Side: Image */}
        <Image
          url={imageUrl}
          position={[imgWidth / 2 + 0.5, 0, 0]}
          scale={[imgWidth, imgHeight]}
          transparent
          opacity={1}
        />

      </group>
    </group>
  );
}
