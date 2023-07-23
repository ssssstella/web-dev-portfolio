import React, { useState, useEffect, useContext } from 'react';
import './sass/cart.css';
import { Plus, Minus, X } from '@phosphor-icons/react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/Context';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const {setProducts, cartLocal, setCartLocal, setShowCart, setShowShopModal} = useContext(MainContext);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [cartLocal])

    const closeCart = () => {
        setShowCart(false);
    }

    const navigate = useNavigate();
    const jumpToDetail = (id) => {
        navigate(`/product/${id}`)
    }

    const cartItemHtml = !cart ? '' : cart.map(product => {
        return <div className='cart--item' key={product.comboId}>
            <div className='cart--item--update'>
                <div>
                    <Plus onClick={() => handleUpdateQuantity(product.comboId, 'add')} size={16} />
                </div>
                <div>
                    <Minus onClick={() => handleUpdateQuantity(product.comboId, 'minus')} size={16} />
                </div>
            </div>
            <div className='cart--item--content'>
                <img src={`/${product.img}`} alt={product.name} />
                <div className='content--grid'>
                    <p className='content--grid--title' onClick={() => jumpToDetail(product.productId)}>{product.name}</p>
                    <p className='small-text'>Quantity</p>
                    <p className='small-text'>Size</p>
                    <p className='small-text'>Color</p>
                    <p className='small-text'>{product.quantity}</p>
                    <p className='small-text'>{product.size} mm</p>
                    <div className='content--grid--color' style={{ backgroundColor: product.color }}></div>
                </div>
                <p className='content-price'>${product.price}.00</p>
            </div>
            <div className='cart--item--clear'>
                <X onClick={() => handleRemoveProduct(product.comboId, product.productId)} size={32} />
            </div>
        </div>
    })


    const handleRemoveProduct = (comboId, productId) => {
        setCart((prevCart) => {
            const updatedCart = [];
            prevCart.map(item => {
                if (item.comboId !== comboId) {
                    updatedCart.push(item)
                }
            })

            // after removing combo, check if there're combos from the same product 
            let productFlag = false;
            updatedCart.map(item => {
                if (item.productId === productId) {
                    productFlag = true;
                }
            })
            if (!productFlag) {
                // if there's no combo from the same product, update isAdded to false
                setProducts(prevProducts => {
                    const updatedProducts = [];
                    prevProducts.map(product => {
                        if (product.id !== productId) {
                            updatedProducts.push(product)
                        }
                        else {
                            updatedProducts.push({ ...product, isAdded: false })
                        }
                    })
                    return updatedProducts
                })
            }

            // update localstorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartLocal(!cartLocal);
            return updatedCart
        })

    }

    const handleUpdateQuantity = (comboId, operation) => {
        setCart((prevCart) => {
            const updatedCart = [];
            prevCart.map(item => {
                if (item.comboId === comboId) {
                    if (operation === 'add') {
                        item = { ...item, quantity: item.quantity + 1 }
                    } else {
                        if (item.quantity - 1 === 0) {
                            handleRemoveProduct(comboId, item.productId)
                        } else {
                            item = { ...item, quantity: item.quantity - 1 }
                        }
                    }
                }
                updatedCart.push(item)
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartLocal(!cartLocal);
            return updatedCart
        })
    }

    const handleCartClear = () => {
        const productsToUpdate = [... new Set(cart.map(item => item.productId))];
        productsToUpdate.map(pid => {
            setProducts(prevProducts => {
                const updatedProducts = [];
                prevProducts.map(product => {
                    if (product.id !== pid) {
                        updatedProducts.push(product)
                    }
                    else {
                        updatedProducts.push({ ...product, isAdded: false })
                    }
                })
                return updatedProducts
            })
        })
        const updatedCart = [];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartLocal(!cartLocal);
    }

    const totalPrice = cart ? cart.reduce((accumulator, combo) => accumulator + (combo.price * combo.quantity), 0) : 0;

    const totalCount = cart ? cart.reduce((accumulator, combo) => accumulator + combo.quantity, 0) : 0;


    const handleCheckout = () => {
        closeCart();
    }


    return (
        <div className='cart'>
            <div className='cart--title'>
                <div>
                    <h4>My basket</h4>
                    <p className="small-text">({totalCount} items)</p>
                </div>
                <div>
                    <button className='btn-light' onClick={closeCart}>Close</button>
                    <button className='btn-light' onClick={handleCartClear}>Clear Basket</button>
                </div>
            </div>
            <div className='cart--box'>
                {cartItemHtml}
            </div>
            <hr></hr>
            <div className='cart--checkout'>
                <div>
                    <p className="small-text">Subtotal Amount:</p>
                    <h4>${totalPrice}.00</h4>
                </div>
                <Link className='link' to="/checkout"><button onClick={handleCheckout}>Check Out</button></Link>
            </div>

        </div>
    )
}

