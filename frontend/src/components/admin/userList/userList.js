import React, { useEffect,useState } from 'react';
import request from '../../../services/api';
import { Link,useNavigate } from 'react-router-dom';

function UserList(){

    const [usersList,setUsersList] = useState([]);

    const getAllUsers = () => {
        request(
            "GET",
            "/admin/users",
            {}
        ).then((response)=>{
            setUsersList(response.data);
        }).catch((error)=>{
            console.log(error)
        });
    }

    useEffect(()=>{
        getAllUsers();
    },[])

    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/admin/userDetails/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/admin/editUser/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            request(
                "DELETE",
                `/admin/deleteUser/${id}`,
                {}
            ).then(()=>{
                setUsersList(prevUsersList => prevUsersList.filter(user => user.id !== id));
            }).catch((error)=>{
                console.log(error.message);
            })
        }
    }

    const searchUser = (e) => {
        const query = e.target.value;
        if(query.trim() === ''){
            getAllUsers();
            return;
        }
        request(
            "GET",
            `/admin/searchUser/${query}`,
            {}
        ).then((response)=>{
            setUsersList(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }


    return(
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className='mt-4'>Users List</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn d-flex justify-content-between mx-3 mb-4">
                        <Link to="/admin/user/create" className="btn btn-success">Add New (+)</Link>
                        <input type='text' 
                            placeholder='Search User'  
                            onKeyUp={searchUser} 
                            style={{maxWidth:'400px'}}/>
                    </div>
                    <table className="table table-bordered mt-3">
                        <thead className="bg-dark text-white">
                            <tr>
                            <th className='text-center' scope="col">First Name</th>
                            <th className='text-center' scope="col">Last Name</th>
                            <th className='text-center' scope="col">Email</th>
                            <th className='text-center' scope="col">Role</th>
                            <th className='text-center' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList && usersList.map((item) => (
                                item.role !== 'ADMIN' && (
                                    <tr key={item.id}>
                                    <th scope="row">{item.firstName}</th>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td className='d-flex justify-content-around'>
                                        <button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</button>
                                        <button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</button>
                                        <button onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</button>
                                    </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;