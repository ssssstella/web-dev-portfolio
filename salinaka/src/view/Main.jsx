import React from 'react';
import Hero from "../component/hero/Hero";
import ProductPanel1 from "../component/productCard/ProductPanel1";

export default function Main() {
  return (
    <div>
      <Hero 
        title="See everything with Clarity" 
        msg="Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered." 
        btn="Shop Now"
        img="assets/person1.png"/>
      <ProductPanel1 title="Featured Products" link="/featured" idx={[2, 4, 6, 8, 10, 12]}/>
      <ProductPanel1 title="Recommended Products" link="/recommended" idx={[1, 3, 5, 7, 9, 11]}/>
    </div>
  )
}
