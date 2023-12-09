import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import request from '../../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../common/header/Header';
import { updateLoggedUser } from '../../../../features/authSlice';

function UserEdit() {

    const navigate = useNavigate();
    const [error,setError] = useState("");
    const {userId} = useParams();
    const[userData,setUserData] = useState({
        id:"",
        firstName:"",
        lastName:"",
        email:""
    });

    const {loggedUser} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const url = loggedUser.role === "ADMIN" ? `/admin/userDetails/${userId}` : `/user/userDetails/${userId}`;
        request(
            "GET",
            url,
            {}
        ).then((resp) => {
            setUserData(resp.data)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [userId,loggedUser.role]);

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const url = loggedUser.role === "ADMIN" ? `/admin/editUser/${userId}` : `/user/editUser/${userId}`;
        request(
            "PUT",
            url,
            userData
        ).then((response)=>{
            if(response.data.includes("success")){
                if(loggedUser.id === userData.id){
                    dispatch(updateLoggedUser({
                        firstName:userData.firstName,
                        lastName:userData.lastName,
                        email:userData.email
                    }));
                }
                loggedUser.role === "ADMIN" ? navigate("/adminHome") : navigate("/profile")
            }
            else{
                setError("Email Id exists")
            }
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className="row mt-5">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>User Details Edit</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className='ps-2'>ID :</label>
                                        <input value={userData.id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className='ps-2'>First Name :</label>
                                        <input required name="firstName" value={userData.firstName} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className='ps-2'>Last Name :</label>
                                        <input name='lastName' value={userData.lastName} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        {error && <p style={{textAlign:"center",color:"red"}}>{error}</p>}
                                        <label className='ps-2'>Email :</label>
                                        <input value={userData.email} onChange={handleChange} className="form-control" name='email'></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to={loggedUser.role === "ADMIN" ? "/adminHome" : "/Profile"}
                                        className="btn btn-danger">Back</Link>
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

export default UserEdit
