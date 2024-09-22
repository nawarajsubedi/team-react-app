import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ConsoleLayout from '../layouts/ConsoleLayout';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
// import Apps from '../pages/Notes';
import PlayerManager from '../pages/PlayerManager';

import AuthProvider from '../hooks/AuthProvider';

import '../App.css';
import Teams from '../pages/Teams';
import TeamGeneration from '../pages/TeamGeneration';
import GeneratedTeam from '../pages/GeneratedTeam';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="teams/:teamname/:base64" element={<GeneratedTeam />} />
            <Route path="not-found" element={<NotFound />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
          <Route path="console" element={<ConsoleLayout />}>
            {/* <Route path="" element={<Apps />} /> */}
            <Route path="players" element={<PlayerManager />} />
            <Route path="teams" element={<Teams />} />
            <Route path="team-generation" element={<TeamGeneration />} />
            <Route path="note-editor" element={<PlayerManager />} />
            <Route path="note-editor/:id" element={<PlayerManager />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
