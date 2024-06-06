import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MainIslandModel } from '../models/MainIslandModel';
import useIsland from '../../hooks/moldevPage/useIslandContainer';
import LineHeaderContainer from './LineHeaderContainer';

const MainContainer = () => {
  const { lightIntensity, positions, colors } = useIsland(false);
  return (
    <div className="w-2/3 min-h-screen h-screen flex flex-col items-center justify-start bg-gradient object-cover text-black gap-y-50 py-60 overflow-y-scroll">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="w-[300px] h-[200px]">
          <Canvas
            shadows
            camera={{ fov: 75, near: 0.1, far: 500, position: [0, 2, 5] }}
          >
            <OrbitControls
              autoRotate
              autoRotateSpeed={0.5}
              enableZoom={false}
            />
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
            <MainIslandModel scale={0.16} />
          </Canvas>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-3 font-bold text-36">
          <div>개발자들을 위한 섬,</div>
          <div>몰데브에 오신 것을 환영합니다.</div>
        </div>
      </div>
      <LineHeaderContainer />
    </div>
  );
};

export default MainContainer;
