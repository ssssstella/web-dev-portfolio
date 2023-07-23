import React, { useState, useEffect, useContext } from "react";
import "./sass/header.css";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";
import Cart from "../cart/Cart";
import { ShoppingCartSimple, Bag, Funnel, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import Badge from '@mui/material/Badge';
import Filter from "../filter/Filter";
import MainContext from '../context/Context';
import ShopModal from "../shopmodal/ShopModal";


export default function Header() {
    // scroll to stick 
    useEffect(() => {
        window.addEventListener("scroll", () => {
            let header = document.querySelector(".header");
            let scrollTop = document.documentElement.scrollTop;
            if (header) {
                header.style.position = scrollTop > 80 ? "sticky" : "relative";
                header.style.backgroundColor = scrollTop > 80 ? "white" : "rgba(242, 242, 242, 0.4)";
            }
        })

        return () => {
            window.removeEventListener("scroll", () => {
                let header = document.querySelector(".header");
                let scrollTop = document.documentElement.scrollTop;
                if (header) {
                    header.style.position = scrollTop > 80 ? "sticky" : "relative";
                    header.style.backgroundColor = scrollTop > 80 ? "white" : "rgba(242, 242, 242, 0.4)";
                }
            })
        }
    })


    const { showCart, setShowCart, cartLocal, showFilter, setShowFilter, showShopModal, setShowShopModal } = useContext(MainContext);
    const openCart = () => {
        setShowCart(true);
    }

    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        setTotalCount(cart ? cart.reduce((accumulator, combo) => accumulator + combo.quantity, 0) : 0);
    }, [cartLocal])

    // use location, if current page is 'shop' page, render filter icon
    const showFilterIcon = useLocation().pathname === '/shop' ? true : false;

    return (
        <div className="header">
            {showFilter && <div className='filterBackdrop' onClick={() => setShowFilter(false)}></div>}
            {showShopModal && <div className='shopModalBackdrop' onClick={() => setShowShopModal(false)}></div>}
            {showShopModal && <ShopModal/>}
            <div className="header--left">
                <Logo />
                <Nav />
            </div>

            <div className="header--right">
                <div className="header--shop">
                    {showFilterIcon ? <div className="header--shop--filter" onClick={() => setShowFilter(true)}><p>Filters</p><Funnel size={24} /></div> : ''}
                    {showFilter && <Filter />}
                    <input type="search" placeholder="Search product..." />
                    {totalCount ? <Badge badgeContent={totalCount} color="primary"><Bag className="header--shop--icon" size={24} onClick={openCart} /></Badge> : <ShoppingCartSimple className="header--shop--icon" size={24} onClick={openCart} />}
                </div>
                {localStorage.getItem('token') ?
                 <div className="header--account">
                    <p>User</p>
                    <UserCircle size={30} />
                 </div>
                 : <div className="header--regis">
                        <Link className="link" to="/signup"><button>Sign Up</button></Link>
                        <Link className="link" to="/signin"><button className="btn-light">Sign In</button></Link>
                    </div>
                }
            </div>
            {showCart && <Cart />}
        </div>
    )
}