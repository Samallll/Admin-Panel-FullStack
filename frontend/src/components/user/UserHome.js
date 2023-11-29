import React from 'react'
import Header from '../common/header/Header'
import Footer from '../common/footer/Footer'

function UserHome() {

  return (
    <div>
        <Header/>
            <h1 style={{
                color:'black',
                top:'150px',
                position:'relative',
                textAlign:'center'}}>Hello world...</h1>
        <Footer/>
    </div>
  )
}

export default UserHome
