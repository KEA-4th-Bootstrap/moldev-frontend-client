import gsap from 'gsap';
import { useCallback } from 'react';
import { Mesh } from 'three';

const useModelRef = (
  position: {
    x: number;
    y: number;
    z: number;
  },
  rotation: {
    x: number;
    y: number;
    z: number;
  },
  positionDuration: number = 10,
  positionYDuration: number = 1,
  rotationDuration: number = 20,
) => {
  const ref = useCallback(
    (node: Mesh) => {
      if (node !== null) {
        gsap.to(node.position, {
          x: position.x,
          z: position.z,
          duration: positionDuration,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
        gsap.to(node.position, {
          y: position.y,
          duration: positionYDuration,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
        gsap.to(node.rotation, {
          x: rotation.x,
          y: rotation.y,
          z: rotation.z,
          duration: rotationDuration,
          repeat: -1,
          ease: 'none',
          yoyo: true,
        });
      }
    },
    [
      position.x,
      position.y,
      position.z,
      rotation.x,
      rotation.y,
      rotation.z,
      positionDuration,
      positionYDuration,
      rotationDuration,
    ],
  );

  return [ref];
};

export default useModelRef;
