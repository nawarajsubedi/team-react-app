import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import MainNavbar from '../components/MainNavbar';

const MainLayout: React.FC = () => {
  return (
    <>
      <MainNavbar/>
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;