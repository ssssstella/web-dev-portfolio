import React from 'react';
import Hero from "../component/hero/Hero";
import ProductPanel1 from "../component/productCard/ProductPanel1";

export default function Recommended() {
  return (
    <div>
      <Hero 
        title="Recommended Products" 
        img="assets/person3.png"/>
      <ProductPanel1 idx={[1, 3, 5, 7, 9, 11]}/>
    </div>
  )
}
