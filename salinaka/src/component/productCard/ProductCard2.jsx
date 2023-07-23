import React, { useState, useContext, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Check } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";
import "./sass/productcard.css";
import MainContext from '../context/Context';

export default function ProductCard2({id}) {
    // get 'products' state and 'local' state
    const { products, setProducts, cartLocal, setCartLocal } = useContext(MainContext);

    const [item, setItem] = useState(products.filter(product => product.id === Number(id))[0]);

    useEffect(()=>{
        setItem(products.filter(product => product.id === Number(id))[0])
    }, [products])
   
    const updateItem = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (!item.isAdded) {
            const selectedSize = item.size[0];
            const selectedColor = item.color ? item.color[0] : '';
            const selectedCombo = item.id + '-' + selectedSize + '-' + selectedColor;
            const itemToAdd = { comboId: selectedCombo, quantity: 1, productId: item.id, name: item.name, price: item.price, img: item.img, size: selectedSize, color: selectedColor };
            // update isAdded to true
            setProducts(prevProducts => {
                const updatedProducts = [];
                prevProducts.forEach(product => {
                    if (product.id !== item.id) {
                        updatedProducts.push(product)
                    }
                    else {
                        updatedProducts.push({ ...product, isAdded: true })
                    }
                })
                return updatedProducts
            })
            cart.push(itemToAdd);
        } else {
            // if product has been added before, remove it from cart
            const updatedCart = []
            cart.forEach(cartItem => {
                if (cartItem.productId !== item.id) {
                    updatedCart.push(cartItem);
                }
            })
            cart = updatedCart;
            // update isAdded to false
            setProducts(prevProducts => {
                const updatedProducts = [];
                prevProducts.forEach(product => {
                    if (product.id !== item.id) {
                        updatedProducts.push(product)
                    }
                    else {
                        updatedProducts.push({ ...product, isAdded: false })
                    }
                })
                return updatedProducts
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartLocal(!cartLocal);
    }

    const btnText = item.isAdded ? "Remove from basket" : "Add to basket";
    const btnStyle = item.isAdded ? { backgroundColor: "rgb(242, 242, 242)", color: "rgb(78, 78, 78)" } : {};

    const navigate = useNavigate();
    const jumpToDetail = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <Card className="productCard2"
            sx={{ maxWidth: 200, maxHeight: 240, border: 1, borderColor: item.isAdded ? 'grey.500' : 'grey.300', borderRadius: 0 }}>
            {item.isAdded && <Check className="product--checked" size={20} color="green" />}
            <div onClick={() => jumpToDetail(id)}>
                <CardMedia
                    sx={{ height: 110 }}
                    image={item.img}
                    title="glasses"
                />
                <CardContent sx={{ height: 130 }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: 13 }}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="grey.400" sx={{ fontStyle: 'italic', fontSize: 12 }}>
                        {item.brand}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ fontSize: 15 }}>
                        ${item.price}.00
                    </Typography>
                </CardContent>
            </div>
            <button className="hide" style={btnStyle} onClick={updateItem}>{btnText}</button>
        </Card>
    )
}