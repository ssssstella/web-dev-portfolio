import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from "@phosphor-icons/react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./sass/productcard.css";
import MainContext from '../context/Context';


export default function ProductCardDetail() {
    // get 'products' state and 'local' state
    const { products, setProducts, cartLocal, setCartLocal } = useContext(MainContext);

    const params = useParams();
    const item = products.filter(item => item.id === Number(params.id))[0];

    // size select
    const [size, setSize] = useState('');
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const sizeItemHTML = item.size.map((val, idx) => <MenuItem key={idx} value={val}>{val} mm</MenuItem>);

    // color select
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        setColor(event.target.value)
    };
    const colorItemHTML = item.color ? item.color.map((val, idx) => <FormControlLabel key={idx} style={{ backgroundColor: val, borderRadius: '50%' }} value={val} control={<Radio sx={{ color: 'transparent', '&.Mui-checked': { color: 'grey.50' } }} />} label="" />) : "";


    const addItemToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedSize = size || item.size[0];
        const selectedColor = color || (item.color ? item.color[0] : '');
        const selectedCombo = item.id + '-' + selectedSize + '-' + selectedColor;
        const itemToAdd = {comboId: selectedCombo, quantity: 1, productId: item.id, name: item.name, price: item.price, img: item.img, size: selectedSize, color: selectedColor};

        if (!item.isAdded) {
            // update isAdded to true
            setProducts(prevProducts => {
                const updatedProducts = [];
                prevProducts.map(product => {
                    if (product.id !== item.id) {
                        updatedProducts.push(product)
                    }
                    else {
                        updatedProducts.push({...product, isAdded: true})
                    }
                })
                return updatedProducts
            })
            cart.push(itemToAdd);
        } else {
            // if product has been added before, check if this size-color combo has been added
            let comboFlag = false;
            cart = cart.map(cartItem => {
                if (cartItem.comboId !== selectedCombo) {
                    return cartItem
                } else {
                    comboFlag = true;
                    return {...cartItem, quantity: cartItem.quantity + 1}
                }
            })
            if(!comboFlag) {
                cart.push(itemToAdd);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartLocal(!cartLocal);
    }


    return (
        <div className='productCardDetail'>
            <Link className="link" to='/shop'><ArrowLeft size={20} />Back to shop</Link>
            <div className='detailPanel'>
                <div className='detailPanel--left'>
                    <div>
                        <img src={`/${item.img}`} alt={item.name} />
                    </div>
                </div>
                <div className='detailPanel--bar'></div>
                <div className='detailPanel--middle'>
                    <img src={`/${item.img}`} alt={item.name} />
                </div>
                <div className='detailPanel--right'>
                    <p className='small-text'>{item.brand}</p>
                    <h4>{item.name}</h4>
                    <p className='small-text'>{item.desc}</p>
                    <hr></hr>
                    <p className='small-text'>Lens Width and Frame Size</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} className="select">
                        <InputLabel id="size-select-label">Size</InputLabel>
                        <Select
                            labelId="size-select-label"
                            id="size-select"
                            value={size}
                            label="size"
                            onChange={handleSizeChange}
                        >
                            {sizeItemHTML}
                        </Select>
                    </FormControl>

                    <p className='small-text'>Choose Color</p>
                    <FormControl className="select">
                        <RadioGroup
                            row
                            aria-labelledby="color-select-label"
                            name="color-select"
                            value={color}
                            onChange={handleColorChange}
                        >
                            {colorItemHTML}
                        </RadioGroup>
                    </FormControl>
                    <button onClick={addItemToCart}>Add to basket</button>
                </div>
            </div>
        </div>
    )
}

