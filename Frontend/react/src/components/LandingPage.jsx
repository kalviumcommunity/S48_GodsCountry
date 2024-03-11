import React from 'react';
import './landingpage.css'; 
// import { Link } from 'react-router-dom';

function GodsCountry() {
  return (
    <div>
      <header>
        <h1 className='welcome' style={{ color: 'black' }}>Welcome to God's Country</h1>
        <nav>
          <ul>
            {/* <li><Link to="/Login" className="button">Login</Link></li>
            <li><Link to="/signup" className="button">Sign Up</Link></li>
            <li><Link to="/UserList" className="button">UserLists</Link></li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default GodsCountry;
