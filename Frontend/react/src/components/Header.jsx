import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div>
      <header className="header-container">
        <div className="headcontainer">
          <div id='header-heading'><h1>God's Country </h1></div>
          <nav id='header-navbar'>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/temple">Temples</a></li>
              <li><a href="/loginpage">Login</a></li>
              <li><a href="/signup">Sign Up</a></li> 
              <li><a href="/userdata">UserData</a></li> 

            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
