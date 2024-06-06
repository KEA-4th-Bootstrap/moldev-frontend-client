import { useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { TextureLoader } from 'three';
import useModelRef from '../models/useModelRef';
import useShadowRef from './useShadowRef';
import useRouteNavigate from '../common/useRouteNavigate';
import { getMoldevId } from '../../api/manageLocalStorage';
import { OrbitControls } from 'three-stdlib';
import { useNavigate } from 'react-router-dom';

const useIsland = (showTravel: boolean) => {
  const navigate = useNavigate();
  const { moldevId } = useParams() as { moldevId: string };
  const myMoldevId = getMoldevId();
  const [awardsHover, setAwardsHover] = useState(false);
  const [projectHover, setProjectHover] = useState(false);
  const [activityHover, setActivityHover] = useState(false);
  const [troubleHover, setTroubleHover] = useState(false);
  const orbitRef = useRef<OrbitControls>(null);

  useEffect(() => {
    let timeout1: any, timeout2: any, timeout3: any;

    if (orbitRef.current) {
      if (!showTravel) {
        orbitRef.current.autoRotate = true;
        orbitRef.current.autoRotateSpeed = 70;

        timeout1 = setTimeout(() => {
          if (orbitRef.current) {
            orbitRef.current.autoRotateSpeed = 50;
          }
          // 50의 속도로 3바퀴
        }, 1000); // 50의 속도로 3바퀴 돌 시간(360도 * 3 = 1080도, 50의 속도로 6000ms 동안 회전)

        timeout2 = setTimeout(() => {
          if (orbitRef.current) {
            orbitRef.current.autoRotateSpeed = 30;
          }
          // 30의 속도로 2바퀴
        }, 1000); // 50의 속도로 3바퀴 + 30의 속도로 2바퀴 돌 시간(360도 * 2 = 720도, 30의 속도로 8000ms 동안 회전)

        timeout3 = setTimeout(() => {
          if (orbitRef.current) {
            orbitRef.current.autoRotate = false;
          }
          // 10의 속도로 1바퀴
        }, 500); // 50의 속도로 3바퀴 + 30의 속도로 2바퀴 + 10의 속도로 1바퀴 돌 시간(360도, 10의 속도로 6000ms 동안 회전)
      }
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [showTravel]);

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

  const { onClickIcon: onClickHome } = useRouteNavigate(`/`);

  const onClickMyPage = () => {
    navigate(`/${myMoldevId}`, {
      state: { nickname: '몰데브 주인', islandName: '특별한' },
    });
  };

  return {
    moldevId,
    myMoldevId,
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
    onClickHome,
    onClickMyPage,
    orbitRef,
  };
};

export default useIsland;
