import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, Object3D } from 'three';
import { ReactComponent as Visit } from '../../assets/icons/icon_visit.svg';
import { ReactComponent as Project } from '../../assets/icons/icon_project.svg';
import { ReactComponent as Trouble } from '../../assets/icons/icon_trouble.svg';
import { ReactComponent as Activity } from '../../assets/icons/icon_activity.svg';
import { ReactComponent as Awards } from '../../assets/icons/icon_awards.svg';
import { ReactComponent as Write } from '../../assets/icons/icon_write_main.svg';
import { IslandModel } from '../models/IslandModel';
import { TrophyModel } from '../models/TrophyModel';
import { GunModel } from '../models/GunModel';
import Toggle from './Toggle';
import useIsland from '../../hooks/moldevPage/useIslandContainer';

const IslandContainer = () => {
  const {
    // moldevId,
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
  } = useIsland();

  return (
    <div className="w-2/3 min-h-screen h-screen flex items-center justify-center relative">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 500, position: [5, 15, 30] }}
      >
        <OrbitControls minDistance={15} maxDistance={45} />
        <ambientLight position={[0, 0, 0]} intensity={2} color="#FFFFFF" />
        <directionalLight
          position={[positions[0][0], positions[0][1], positions[0][2]]}
          intensity={lightIntensity}
          color={colors[0]}
        />
        <directionalLight
          position={[positions[1][0], positions[1][1], positions[1][2]]}
          intensity={lightIntensity}
          color={colors[1]}
        />
        <directionalLight
          position={[positions[2][0], positions[2][1], positions[2][2]]}
          intensity={lightIntensity}
          color={colors[2]}
        />
        <directionalLight
          position={[positions[3][0], positions[3][1], positions[3][2]]}
          intensity={lightIntensity}
          color={colors[3]}
        />
        <directionalLight
          position={[positions[4][0], positions[4][1], positions[4][2]]}
          intensity={lightIntensity}
          color={colors[4]}
        />
        <directionalLight
          position={[positions[5][0], positions[5][1], positions[5][2]]}
          intensity={lightIntensity}
          color={colors[5]}
        />
        <directionalLight
          position={[positions[6][0], positions[6][1], positions[6][2]]}
          intensity={lightIntensity}
          color={colors[6]}
        />
        <directionalLight
          position={[positions[7][0], positions[7][1], positions[7][2]]}
          intensity={lightIntensity}
          color={colors[7]}
        />
        <directionalLight
          castShadow
          ref={shadowLightRef}
          target={new Object3D()}
          position={[0, 0, 10]} // 위치
          intensity={5} // 강도
          color={'#ffffff'} // 색상
        />
        <directionalLight
          castShadow
          ref={shadowLightRef2}
          target={new Object3D()}
          position={[20, 0, 10]} // 위치
          intensity={5} // 강도
          color={'#ffffff'} // 색상
        />
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <sphereGeometry args={[60, 32, 32]} />
          <meshStandardMaterial color={'white'} side={DoubleSide} />
        </mesh>
        {/* 섬 모델 */}
        <IslandModel
          setHover={setProjectHover}
          isHover={projectHover}
          onClickProject={onClickProject}
        />
        <TrophyModel
          setHover={setAwardsHover}
          isHover={awardsHover}
          onClick={onClickAwards}
        />
        <GunModel
          setHover={setTroubleHover}
          isHover={troubleHover}
          onClick={onClickTrouble}
        />
        <mesh
          position={[-8, 0, 8]}
          receiveShadow
          castShadow
          ref={ballRef}
          scale={activityHover ? 1.2 : 1}
          onPointerEnter={() => setActivityHover(true)}
          onPointerOut={() => setActivityHover(false)}
          onClick={onClickActivity}
        >
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial map={colorMap} side={DoubleSide} />
        </mesh>
      </Canvas>
      <div className="absolute top-[30px] left-[24px]">
        <Toggle
          type="default"
          icon={<Visit />}
          text="28명 방문"
          isItemHover={false}
          onClick={() => {}}
          canClick={false}
        />
      </div>
      <div className="absolute bottom-[30px] left-[24px] flex flex-col items-start justify-center gap-y-16">
        <Toggle
          type="default"
          icon={<Project />}
          text="프로젝트"
          isItemHover={projectHover}
          onClick={onClickProject}
          canClick={true}
        />
        <Toggle
          type="default"
          icon={<Trouble />}
          text="트러블슈팅"
          isItemHover={troubleHover}
          onClick={onClickTrouble}
          canClick={true}
        />
        <Toggle
          type="default"
          icon={<Activity />}
          text="대외활동"
          isItemHover={activityHover}
          onClick={onClickActivity}
          canClick={true}
        />
        <Toggle
          type="default"
          icon={<Awards />}
          text="수상이력"
          isItemHover={awardsHover}
          onClick={onClickAwards}
          canClick={true}
        />
      </div>
      <div className="absolute bottom-[30px] right-[24px]">
        <Toggle
          type="main"
          icon={<Write />}
          text="글쓰기"
          isItemHover={false}
          onClick={onClickWrite}
          canClick={true}
        />
      </div>
    </div>
  );
};

export default IslandContainer;
