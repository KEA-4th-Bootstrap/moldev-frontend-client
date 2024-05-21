import React from 'react';
import IslandContainer from '../components/moldevPage/IslandContainer';
import SidebarContainer from '../components/sidebar/SidebarContainer';
import { Outlet } from 'react-router-dom';

const MoldevPage = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-end">
      <SidebarContainer />
      <IslandContainer />
      <Outlet />
    </div>
  );
};

export default MoldevPage;
