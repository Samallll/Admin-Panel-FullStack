import React from 'react';
import Header from '../../common/header/Header'
import { useSelector } from 'react-redux';
import UserList from '../userList/UserList';

function AdminHome() {

    const {loggedUser} = useSelector((state=>state.auth))

  return (
    <div className='background-setup'>
        <Header/>
            <div className='container mt-5 pt-2'>
                {loggedUser && loggedUser.role === 'ADMIN' ? 
                <div className='container mt-5'>
                    <UserList/>
                </div>
                :
                <h1 style={{color:'red',position:'relative',top:'150px'}}>No Access to this page!!</h1>
                }
            </div>
    </div>
  )
}

export default AdminHome
