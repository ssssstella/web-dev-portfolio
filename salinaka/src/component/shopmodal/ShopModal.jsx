import React, {useContext} from 'react';
import './sass/shopmodal.css';
import {Link} from "react-router-dom";
import MainContext from "../context/Context";

export default function ShopModal() {
    const {setShowShopModal} = useContext(MainContext);

    return (
        <div className='shopmodal'>
            <p>You must sign in to continue checking out</p>
            <div>
                <button className='btn-light' onClick={() => setShowShopModal(false)}>Continue Shopping</button>
                <Link className="link" to="/signin"><button onClick={() => setShowShopModal(false)}>Sign In to checkout</button></Link>
            </div>
        </div>
    )
}
