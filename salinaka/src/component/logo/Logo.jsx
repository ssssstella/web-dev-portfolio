import React from 'react';
import { Link } from 'react-router-dom';
import "./sass/logo.css";

export default function Logo() {
    return (
        <div className='logo'>
            <Link className="link" to="/">
                <img className="logo--icon" src="assets/Salinaka.png" alt="logo" />
            </Link>
        </div>
    )
}
