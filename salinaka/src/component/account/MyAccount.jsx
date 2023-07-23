import React from 'react';
import "./sass/account.css";

export default function MyAccount() {
  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <div className='myAccount'>
      <div className='myAccount--banner'>
        <img className="banner" src="assets/banner.jpg" alt="banner" />
        <img className="avatar" src="assets/avatar.jpg" alt="avatar" />
        <button>Edit Account</button>
      </div>
      <div className='myAccount--detail'>
        <h4>Test Name</h4>
        <p>Email</p>
        <p className="small-text">{token.email}</p>
        <p>Address</p>
        <p className="small-text">Address not set</p>
        <p>Mobile</p>
        <p>Date Joined</p>
        <p className="small-text">July 17, 2023</p>
      </div>
    </div>
  )
}
