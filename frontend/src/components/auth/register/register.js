
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

    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({
         ...formData, 
         [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {

        if(Object.values(formData).some(value => value === null || value === '')){
            return;
        }
        e.preventDefault();
        setAuthHeader(null);
        request(
            "POST",
            "/common/register",
            formData
        ).then((response) => {
            if(response.data.includes("success")){
                navigate('/login')
            }
            else{
                setError("Email Id exists")
                setFormData({
                    ...formData,
                    email: '',
                });
            }
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
        {error && <p style={{
            textAlign:"center",
            color:"red",
            marginTop:"25px",
            marginBottom:"10px"
            }}>{error}</p>}
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
