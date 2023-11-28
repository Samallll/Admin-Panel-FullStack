
import React, { useState } from 'react';
import './Login.css';
import request from '../../../services/api';
import { setAuthHeader } from '../../../services/api';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error,setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
         ...formData, 
        [e.target.name]: e.target.value 
        });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    request(
      "POST",
      "/common/authenticate",
      formData).then(
      (response) => {
          setAuthHeader(response.data.token);
          navigate('/')
      }).catch(
      (error) => {
        setError(error)
        setFormData({
          email: '',
          password: ''
        })
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error!==null && <p className='error'>Username or password is incorrect!</p>}
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
          <button type="submit">Login</button>
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
