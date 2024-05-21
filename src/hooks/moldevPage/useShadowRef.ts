import { useCallback } from 'react';
import { DirectionalLight } from 'three';

const useShadowRef = () => {
  const shadowLightRef = useCallback((node: DirectionalLight) => {
    if (node !== null) {
      const shadow = node.shadow;
      shadow.mapSize.width = 3000;
      shadow.mapSize.height = 3000;
      shadow.camera.near = 10;
      shadow.camera.far = 500;
      shadow.camera.left = -200;
      shadow.camera.right = 200;
      shadow.camera.top = 200;
      shadow.camera.bottom = -200;
      shadow.radius = 5;
    }
  }, []);

  return [shadowLightRef];
};

export default useShadowRef;
