import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/console/players', label: 'Players' },
    { path: '/console/teams', label: 'Teams' },
    { path: '/console/team-generation', label: 'Team Generation' },
  ];

  return (
    <div>
      {menuItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <nav key={item.path} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <NavLink
              to={item.path}
              style={{
                color: isActive ? 'blue' : 'black',
                textDecoration: 'none',
                padding: '10px',
                fontWeight: isActive ? 'bold' : 'normal', // Highlight with bold text
              }}
            >
              {item.label}
            </NavLink>
          </nav>
        );
      })}
    </div>
  );
};

export default SideBar;
