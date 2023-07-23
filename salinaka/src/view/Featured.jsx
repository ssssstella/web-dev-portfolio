import React from 'react';
import Hero from "../component/hero/Hero";
import ProductPanel1 from "../component/productCard/ProductPanel1";

export default function Featured() {
  return (
    <div>
      <Hero 
        title="Featured Products" 
        img="assets/person2.png"/>
      <ProductPanel1 idx={[2, 4, 6, 8, 10, 12]}/>
    </div>
  )
}
