
import React from 'react';
import './Header.css'
import { setAuthHeader } from '../../../services/api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Header = () => {

  const navigate = useNavigate();
  const {loggedUser} = useSelector((state)=>state.auth)

  const logout = () => {
    setAuthHeader(null);
    navigate("/login")
  }

  return (
    <header className="header">
      <h1>{loggedUser ? `Welcome ${loggedUser.firstName}..` : 'Guest'}</h1>

      <nav>
        <ul>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
