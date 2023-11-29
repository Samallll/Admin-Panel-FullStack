import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import request from '../../../../services/api';

function UserEdit() {

    const navigate = useNavigate();
    const {userId} = useParams();
    const[userData,setUserData] = useState({
        id:"",
        firstname:"",
        lastname:"",
        email:""
    });

    useEffect(() => {
        request(
            "GET",
            `/admin/userDetails/${userId}`,
            {}
        ).then((resp) => {
            setUserData(resp.data)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        request(
            "PUT",
            `/admin/editUser/${userId}`,
            userData
        ).then(()=>{
            console.log("server completed")
            navigate('/adminHome');
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
                                        <input required name="firstname" value={userData.firstname} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className='ps-2'>Last Name :</label>
                                        <input name='lastname' value={userData.lastname} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className='ps-2'>Email :</label>
                                        <input value={userData.email} onChange={handleChange} className="form-control" name='email'></input>
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

export default UserEdit
