import React, { useContext } from 'react';
import ProductCard1 from './ProductCard1';
import "./sass/productcard.css";
import { Link } from "react-router-dom";
import MainContext from '../context/Context';

export default function ProductPanel1({ title, link, idx }) {
    const { products } = useContext(MainContext);
    if (products) {
        const selected = idx.map(value => products[value]);
        const selectedCards = selected.map(item => {
            return <ProductCard1
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.img}
                brand={item.brand}
            />
        });

        return (
            <div className='productPanel1'>
                {title && <div className='productPanel1--title'>
                    <h3>{title}</h3>
                    <Link className="link" to={link}>See All</Link>
                </div>}
                <div className='productPanel1--grid'>
                    {selectedCards}
                </div>
            </div>
        )
    }

}
