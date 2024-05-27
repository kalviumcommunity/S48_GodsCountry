import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <h1>God's Country</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/temple">Temples</a></li>
          <li><a href="/Loginpage">Login</a></li>
          <li><a href="/create">Sign Up</a></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
