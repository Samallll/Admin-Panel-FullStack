
import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import {  setAuthHeader } from '../../../services/api';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading,error} = useSelector((state)=>state.auth);

  // const [error,setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
         ...formData, 
        [e.target.name]: e.target.value 
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthHeader(null);
    dispatch(loginUser(formData,navigate));
    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error!==null && <p className='error'>Username or password is incorrect!</p>}
      {isLoading && <p style={{ color: 'green',textAlign:'center',fontSize:20 }}>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <div className='buttons'>
          <button type="submit">
            Login
          </button>
          <Link to={"/register"}>
            <button>
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
