import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth.js';

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

 return ( 
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Item
        name='profile'
        active={activeItem === 'profile'}
        onClick={handleItemClick} 
        as={Link} 
        to="/profile" 
      />
      
      <Menu.Item
        name='chat'
        active={activeItem === 'chat'}
        onClick={handleItemClick}
        as={Link}
        to="/chat"
      />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );
}

export default NavBar;