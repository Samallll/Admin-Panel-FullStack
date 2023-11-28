
import React from 'react';
import './Header.css'
import { setAuthHeader } from '../../../services/api';
import { useNavigate } from 'react-router';

const Header = () => {

  const navigate = useNavigate();

  const logout = () => {
    setAuthHeader(null);
    navigate("/login")
  }

  return (
    <header className="header">
      <h1>Your App Name</h1>
      <nav>
        <ul>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
