import React from 'react';
import MyAccount from "./MyAccount";
import "./sass/account.css";

export default function AccountCenter() {

  return (
    <div className='accountCenter'>
      <div className='accountCenter--title'>
        <h4>Account</h4>
      </div>
      <MyAccount />
    </div>
  )
}
