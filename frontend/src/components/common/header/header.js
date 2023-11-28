
import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <h1>Your App Name</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
