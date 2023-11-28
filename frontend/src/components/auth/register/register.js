
import React, { useState } from 'react';
import './Register.css';
import request from '../../../services/api';
import { setAuthHeader } from '../../../services/api';
import { Link, useNavigate } from "react-router-dom";

function Register(){

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({
         ...formData, 
         [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setAuthHeader(null);
        request(
            "POST",
            "/common/register",
            formData
        ).then(() => {
            navigate('/login')
        }).catch((error) => {
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            });
        });
    };

    return (
    <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <label>
            First Name:
            <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            />
        </label>
        <label>
            Last Name:
            <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            />
        </label>
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
            <button type="submit">Register</button>
            <Link to={"/login"}>
                <button>
                    Login
                </button>
            </Link>
        </div>
        </form>
    </div>
    );
}

export default Register;
