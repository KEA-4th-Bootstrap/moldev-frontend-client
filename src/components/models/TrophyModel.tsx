/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf 
Author: Arun Kumar S (https://sketchfab.com/arun-kumar)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/trophy-clash-royale-57ec3bc84cc74f5a85da07b99f4c770a
Title: Trophy (Clash Royale)
*/

import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import useModel from '../../hooks/models/useModel';

export function TrophyModel(
  props: JSX.IntrinsicElements['group'] & {
    setHover: (hover: boolean) => void;
    isHover: boolean;
    onClick: () => void;
  },
) {
  const {
    nodes,
    materials,
    ref: group,
  } = useModel(
    '/models/trophy/scene.gltf',
    { x: 2, y: 0.5, z: 13 },
    { x: -Math.PI * 2, y: Math.PI, z: Math.PI * 2 },
    10,
    10,
    30,
  );
  return (
    <group
      ref={group as any}
      {...props}
      dispose={null}
      position={[0, 0, 10]}
      onPointerEnter={() => props.setHover(true)}
      onPointerOut={() => props.setHover(false)}
      scale={props.isHover ? 1.25 : 1}
      onClick={props.onClick}
    >
      <mesh
        geometry={(nodes.Object_2 as Mesh).geometry}
        material={materials.Trophy_Gold}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/trophy/scene.gltf');
