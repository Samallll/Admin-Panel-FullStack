
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
    <header className="header" style={{ marginBottom: '20px' }}>
      <h2>{loggedUser ? `Welcome ${loggedUser.firstName}..` : 'Guest'}</h2>
      <nav>
        <ul className='mb-0'>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
