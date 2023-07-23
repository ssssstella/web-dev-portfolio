import { NavLink } from 'react-router-dom';
import React from 'react';
import "./sass/nav.css";

export default function Nav() {
    return (
        <div className='nav'>
            <NavLink className={({isActive}) => isActive ? "highlight link" : "link" } to="/main">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "highlight link" : "link" } to="/shop">Shop</NavLink>
            <NavLink className={({isActive}) => isActive ? "highlight link" : "link" } to="/featured">Featured</NavLink>
            <NavLink className={({isActive}) => isActive ? "highlight link" : "link" } to="/recommended">Recommended</NavLink>
        </div>
    )
}
