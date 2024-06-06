import React from 'react';
import IslandContainer from '../components/moldevPage/IslandContainer';
import SidebarContainer from '../components/sidebar/SidebarContainer';
import { Outlet } from 'react-router-dom';
import TravelComponent from '../components/moldevPage/TravelComponent';
import { useMoldevPage } from '../hooks/moldevPage/useMoldevPage';

const MoldevPage = () => {
  const { showTravel, nickname, islandName } = useMoldevPage();
  return (
    <div className="flex w-full min-h-screen items-center justify-end">
      <SidebarContainer defaultSelected="list" />
      <IslandContainer showTravel={showTravel} />
      {showTravel && (
        <TravelComponent
          nickname={nickname || ''}
          islandName={islandName || ''}
        />
      )}
      <Outlet />
    </div>
  );
};

export default MoldevPage;
