import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import request from '../../../../services/api';

function UserCreate() {

    const navigate = useNavigate();
    const [error,setError] = useState("");

    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
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
        if(Object.values(formData).some(value => value === null || value === '')){
            return;
        }
        e.preventDefault();
        request(
            "POST",
            "/common/register",
            formData
        ).then((response) => {
            if(response.data.includes("success")){
                navigate("/adminHome")
            }
            else{
                setError("Email Id exists")
                setFormData({
                    ...formData,
                    email: '',
                });
            }
        }).catch((error) => {
            console.log(error)
            setFormData({
                firstName: '',
                lastName: '',
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
                                {error && <p style={{textAlign:"center",color:"red"}}>{error}</p>}
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input required value={formData.firstName} onChange={handleChange} className="form-control" name="firstName"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input required value={formData.lastName} onChange={handleChange} className="form-control" name='lastName'></input>
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
