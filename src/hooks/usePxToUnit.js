import { useThree } from '@react-three/fiber';
import { useCallback } from 'react';

/**
 * A custom hook that returns a function to convert standard pixel values to R3F 3D viewport units.
 * This guarantees text and elements match exact CSS pixel sizing on screen regardless of distance,
 * maintaining true responsiveness when scaled.
 *
 * @returns {function(number, number?): number} A conversion function `(px, parentScale = 1) => units`
 */
export function usePxToUnit() {
  const { viewport, size } = useThree();

  return useCallback(
    (px, scale = 1) => {
      // ratio: viewport.height / size.height tells us how many 3D units equal 1 physical screen pixel
      return ((px / size.height) * viewport.height) / scale;
    },
    [viewport.height, size.height]
  );
}
