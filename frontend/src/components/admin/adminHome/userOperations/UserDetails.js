import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import request from '../../../../services/api';

function UserDetails() {

    const{userId} = useParams();
    const[userData,setUserData] = useState();

    useEffect(()=>{
        request(
            "GET",
            `/admin/userDetails/${userId}`,
            {}
        ).then((response)=>{
            setUserData(response.data);
        }).catch((error)=>{
            console.log(error.message);
        })
    },[userId]);

  return (
    <div className='mt-5'>
        <div className="container">
            <div className="card row p-5" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2 className='mb-5'>User Details</h2>
                    <hr/>
                </div>
                <div className="card-body"></div>
                {userData &&
                    <div>
                        <h4>First Name : {userData.firstName}</h4>
                        <h4>Last Name : {userData.lastName}</h4>
                        <h4 className='mb-5'>Email : {userData.email}</h4>
                        <Link className="btn btn-danger" to="/adminHome">Back to Listing</Link>
                    </div>
                }
                </div>
            </div>
        </div >
  )
}

export default UserDetails
