
import React, { useState } from 'react';
import './Register.css';

function Register(){

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
    setFormData({
         ...formData, [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted:', formData);
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
        <button type="submit">Register</button>
        </form>
    </div>
    );
}

export default Register;
