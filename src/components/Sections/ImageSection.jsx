import React from 'react';
import { Image } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function ImageSection({ url, position = [0, 0, 0], opacity = 0.9 }) {
  const { viewport } = useThree();

  return (
    <group position={position}>
      <Image 
        url={url} 
        position={[0, 0, -5]} 
        scale={[viewport.width * 0.7, viewport.height * 0.7]} 
        transparent
        opacity={opacity}
      />
    </group>
  );
}
