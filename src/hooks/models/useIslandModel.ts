import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

const useIslandModel = () => {
  const group = useRef<Group>();
  const { nodes, materials, animations } = useGLTF('/models/island/scene.gltf');
  const { actions } = useAnimations(animations, group);

  // 애니메이션 시작
  useEffect(() => {
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const firstAction = actions[actionNames[0]];
      firstAction?.setEffectiveTimeScale(0.3);
      firstAction?.play();
    }

    // 컴포넌트가 언마운트될 때 애니메이션 정지
    return () => {
      if (actionNames.length > 0) {
        const firstAction = actions[actionNames[0]];
        firstAction?.stop();
      }
    };
  }, [actions]);

  return { nodes, materials, group };
};

export default useIslandModel;
