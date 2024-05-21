import { useGLTF } from '@react-three/drei';
import useModelRef from './useModelRef';

const useModel = (
  url: string,
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
  const [ref] = useModelRef(
    position,
    rotation,
    positionDuration,
    positionYDuration,
    rotationDuration,
  );
  const { nodes, materials } = useGLTF(url);

  return { nodes, materials, ref };
};

export default useModel;
