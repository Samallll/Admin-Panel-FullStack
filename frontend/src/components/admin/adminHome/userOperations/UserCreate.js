import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import request from '../../../../services/api';

function UserCreate() {

    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setFormData({
             ...formData, 
             [e.target.name]: e.target.value 
            });
        };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        request(
            "POST",
            "/common/register",
            formData
        ).then(() => {
            navigate("/adminHome")
        }).catch((error) => {
            console.log(error)
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            });
        });
    }


  return (
    <div>
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>User Creation</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input required value={formData.firstname} onChange={handleChange} className="form-control" name="firstname"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input required value={formData.lastname} onChange={handleChange} className="form-control" name='lastname'></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input name='email' value={formData.email} onChange={handleChange} className="form-control" type='email'></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type='password' value={formData.password} onChange={handleChange} className="form-control" name='password'></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">Save</button>
                                        <Link to="/adminHome" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
  )
}

export default UserCreate
