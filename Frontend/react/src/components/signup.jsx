import React from 'react';
import './signup.css'; 

function SignUp() {
  return (
    <div className="form-container">
      <header>
        <h1 className='welcome' style={{ color: 'black' }}>Sign Up</h1>
        <form>
          <label htmlFor="username">Username:</label><br/>
          <input type="text" id="username" name="username"/><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password"/><br/><br/>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </header>
    </div>
  );
}

export default SignUp;
