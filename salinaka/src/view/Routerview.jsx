import React, {useContext} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import Shop from "./Shop";
import Featured from "./Featured";
import Recommended from "./Recommended";
import ProductCardDetail from '../component/productCard/ProductCardDetail';
import Checkout from '../component/checkout/Checkout';
import SignUp from '../component/signup/SignUp';
import SignIn from '../component/signin/SignIn';
import AccountCenter from '../component/account/AccountCenter';
import MainContext from '../component/context/Context';

export default function Routerview() {

    return (
        <div>
            <Routes>
                <Route path="/main" element={<Main/>}></Route>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route path="/featured" element={<Featured/>}></Route>
                <Route path="/recommended" element={<Recommended/>}></Route>
                <Route path="/product/:id" element={<ProductCardDetail/>}></Route>
                <Route path="/checkout" element={<Auth><Checkout/></Auth>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/signin" element={<SignIn/>}></Route>
                <Route path="/accountcenter" element={<AccountCenter/>}></Route>
                <Route path="/" element={<Navigate to="/main"></Navigate>}></Route>
            </Routes>
        </div>
    )
}

function Auth({children}) {
    const { setShowShopModal, authUser } = useContext(MainContext);
    const isLogIn = authUser ? true : false;
    if (isLogIn) {
        return children
    } else {
        setShowShopModal(true);
        return <Navigate to="/shop"/>
    }
}