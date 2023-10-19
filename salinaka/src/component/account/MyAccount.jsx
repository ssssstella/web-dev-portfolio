import React, {useContext} from 'react';
import "./sass/account.css";
import MainContext from '../context/Context';

export default function MyAccount() {
  
  const { authUser } = useContext(MainContext);


  return (
    <div className='myAccount'>
      <div className='myAccount--banner'>
        <img className="banner" src="assets/banner.jpg" alt="banner" />
        <img className="avatar" src="assets/avatar.jpg" alt="avatar" />
        <button>Edit Account</button>
      </div>
      <div className='myAccount--detail'>
        <h4>{authUser.displayName}</h4>
        <p>Email</p>
        <p className="small-text">{authUser.email}</p>
        <p>Address</p>
        <p className="small-text">Address not set</p>
        <p>Mobile</p>
        <p>Date Joined</p>
        <p className="small-text">{String(new Date(authUser.metadata.creationTime))}</p>
      </div>
    </div>
  )
}
