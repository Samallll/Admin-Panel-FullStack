import React,{ useState,useEffect} from 'react'
import Header from '../header/Header'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import request from '../../../services/api';

function Profile() {

    const {loggedUser} = useSelector((state) => state.auth);
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {

        // request(
        //     "GET",
        //     `/admin/fileSystem/${loggedUser.id}`,
        //     {}
        // ).then(response => {
        //     const base64Image = btoa(
        //         new Uint8Array(response.data).reduce(
        //             (data, byte) => data + String.fromCharCode(byte),
        //             ''
        //         )
        //     );
        //     console.log(response.data);
        //     setImageSrc(`data:image/jpeg;base64,${response.data}`);
        // })
        // .catch(error => {
        //     console.error('Error fetching image data:', error);
        // });
    }, []);

    const uploadImage = (e) => {
        if(image == null){
            console.log("no image")
            return;
        }
        request(
            "POST",
            "/admin/fileSystem",
            {
                file:image
            }
        ).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    const LoadEdit = (id) => {
        navigate("/admin/editUser/" + id);
    }

  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className='container mt-5'>
            <div className="card">
                <div className="card-body d-flex">
                    <div className="card col-md-2">
                        <div className="card-body">
                            <p className="card-text">Profile Picture</p>
                            <img src={`/api/v1/auth/admin/${loggedUser.id}`} alt="User" />
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <button onClick={uploadImage} className="btn btn-primary">Upload Image</button>
                        </div>
                    </div>
                    <div className="card ms-2 col-md-10">
                        <div className="card-body px-5">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 style={{textAlign:'center'}}>Profile Details</h3>
                                <button onClick={() => {LoadEdit(loggedUser.id)}} className="btn btn-success">Edit</button>
                            </div>
                            <hr/>
                            <div className='mt-4'>
                                <h5 className='text-capitalize'>First Name : {loggedUser.firstName}</h5>
                            </div>
                            <div className='mt-3'>
                                <h5 className='text-capitalize'>Last Name : {loggedUser.lastName}</h5>
                            </div>
                            <div className='mt-3'>
                                <h5 className='text-capitalize'>Email : {loggedUser.email}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-3 container d-flex justify-content-center'>
                <Link to={loggedUser.role==='ADMIN' ? "/adminHome" : "/userHome"} className="btn btn-danger">Back</Link>
            </div>
        </div>
    </div>
  )
}

export default Profile
