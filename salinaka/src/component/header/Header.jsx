import React, { useState, useEffect, useContext } from "react";
import "./sass/header.css";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";
import Cart from "../cart/Cart";
import { ShoppingCartSimple, Bag, Funnel, UserCircle, User, ArrowCircleRight } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import Filter from "../filter/Filter";
import MainContext from '../context/Context';
import ShopModal from "../shopmodal/ShopModal";
import store from "../store/store";



export default function Header() {

    const navigate = useNavigate();


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

    const [searchContent, setSearchContent] = useState('Search product...');
    const handleSearchContent = (e) => {
        setSearchContent(e.target.value);

    }
    const handleSearchSubmit = (e) => {
        // when return is pressed, submit search
        if (e.keyCode === 13) {
            // console.log(e.keyCode);
            store.dispatch({ type: 'search', value: searchContent });
        }
    }


    const { showCart, setShowCart, cartLocal, showFilter, setShowFilter, showShopModal, setShowShopModal, authUser, userSignOut } = useContext(MainContext);
    // console.log(authUser);

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

    const openAccount = () => {
        // console.log('openaccount');
        const headerUser = document.querySelector('.header--user');
        headerUser.style.opacity = 1;
    }


    const jumptoAccount = () => {
        const headerUser = document.querySelector('.header--user');
        headerUser.style.opacity = 0;
        navigate('/accountcenter');
    }

    const signout = () => {
        const headerUser = document.querySelector('.header--user');
        headerUser.style.opacity = 0;
        userSignOut();
        navigate('/signin');
    }

    return (
        <div className="header">
            {showFilter && <div className='filterBackdrop' onClick={() => setShowFilter(false)}></div>}
            {showShopModal && <div className='shopModalBackdrop' onClick={() => setShowShopModal(false)}></div>}
            {showShopModal && <ShopModal />}
            <div className="header--left">
                <Logo />
                <Nav />
            </div>

            <div className="header--right">
                <div className="header--shop">
                    {showFilterIcon ? <div className="header--shop--filter" onClick={() => setShowFilter(true)}><p>Filters</p><Funnel size={24} /></div> : ''}
                    {showFilter && <Filter />}
                    {useLocation().pathname === '/shop' && <input type="search"
                        id="searchbar"
                        value={searchContent}
                        onChange={handleSearchContent}
                        onKeyDown={handleSearchSubmit} />}
                    {totalCount ? <Badge badgeContent={totalCount} color="primary"><Bag className="header--shop--icon" size={24} onClick={openCart} /></Badge> : <ShoppingCartSimple className="header--shop--icon" size={24} onClick={openCart} />}
                </div>
                {authUser ?
                    <div className="header--account" onClick={openAccount}>
                        <p>{authUser.displayName}</p>
                        <UserCircle size={30} />
                    </div>
                    : <div className="header--regis">
                        <Link className="link" to="/signup"><button>Sign Up</button></Link>
                        <Link className="link" to="/signin"><button className="btn-light">Sign In</button></Link>
                    </div>
                }
                {authUser ?
                    <div className="header--user">
                        <div onClick={jumptoAccount}>
                            <p>View Account</p>
                            <User size={24} />
                        </div>
                        <div onClick={signout}>
                            <p>Sign Out</p>
                            <ArrowCircleRight size={24} />
                        </div>
                    </div>
                    : ''
                }
            </div>
            {showCart && <Cart />}
        </div>
    )
}