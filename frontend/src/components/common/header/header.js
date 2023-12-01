
import React from 'react';
import './Header.css'
import { setAuthHeader } from '../../../services/api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  const {loggedUser} = useSelector((state)=>state.auth)

  const logout = () => {
    setAuthHeader(null);
    localStorage.removeItem('logged_user');
    navigate("/login")
  }

  return (
    <header className="header">
      <h2>{loggedUser ? `Welcome ${loggedUser.firstName}..` : 'Guest'}</h2>
      <nav>
        <ul className='mb-0'>
          <li><Link to="/profile" className="btn btn-secondary">Profile</Link></li>
          <li onClick={logout} className="btn btn-danger">Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
