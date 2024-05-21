import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TextureLoader } from 'three';
import useModelRef from '../models/useModelRef';
import useShadowRef from './useShadowRef';
import useRouteNavigate from '../common/useRouteNavigate';

const useIsland = () => {
  const { moldevId } = useParams();
  const [awardsHover, setAwardsHover] = useState(false);
  const [projectHover, setProjectHover] = useState(false);
  const [activityHover, setActivityHover] = useState(false);
  const [troubleHover, setTroubleHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = activityHover ? 'pointer' : 'auto';
  }, [activityHover]);

  useEffect(() => {
    console.log('params', moldevId);
  }, [moldevId]);

  const lightIntensity = 6.0;

  const positions = [
    // points of cube, 8 points, length of each side is 10, center is (0, 0, 0)
    [5, 5, 5],
    [5, 5, -5],
    [5, -5, 5],
    [5, -5, -5],
    [-5, 5, 5],
    [-5, 5, -5],
    [-5, -5, 5],
    [-5, -5, -5],
  ];

  const colors = [
    '#FF2450',
    '#008060',
    '#6A0DAD',
    '#FFD700',
    '#007FFF',
    '#FF9500',
    '#00A78B',
    '#FF5078',
  ];

  const colorMap = useLoader(
    TextureLoader,
    '/models/beachball/textures/ball_texture.jpg',
  );

  const [ballRef] = useModelRef(
    { x: -10, y: 2, z: 8 },
    { x: Math.PI * 2, y: Math.PI, z: 0 },
  );
  const [shadowLightRef] = useShadowRef();
  const [shadowLightRef2] = useShadowRef();

  const { onClickIcon: onClickProject } = useRouteNavigate(
    `/${moldevId}/category/project`,
  );
  const { onClickIcon: onClickAwards } = useRouteNavigate(
    `/${moldevId}/category/awards`,
  );
  const { onClickIcon: onClickTrouble } = useRouteNavigate(
    `/${moldevId}/category/trouble`,
  );
  const { onClickIcon: onClickActivity } = useRouteNavigate(
    `/${moldevId}/category/activity`,
  );

  const { onClickIcon: onClickWrite } = useRouteNavigate(`/write`);

  return {
    moldevId,
    lightIntensity,
    positions,
    colors,
    colorMap,
    projectHover,
    setProjectHover,
    awardsHover,
    setAwardsHover,
    activityHover,
    setActivityHover,
    troubleHover,
    setTroubleHover,
    ballRef,
    shadowLightRef,
    shadowLightRef2,
    onClickProject,
    onClickAwards,
    onClickTrouble,
    onClickActivity,
    onClickWrite,
  };
};

export default useIsland;
