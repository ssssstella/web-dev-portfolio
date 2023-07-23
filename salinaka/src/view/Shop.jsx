import React, { useState, useEffect, useContext, useRef } from 'react';
import ProductCard2 from '../component/productCard/ProductCard2';
import '../component/productCard/sass/productcard.css';
import MainContext from '../component/context/Context';
import { XCircle } from "@phosphor-icons/react";

export default function Shop() {
  const { products, filterLocal, setFilterLocal } = useContext(MainContext);
  const cardList = localStorage.getItem('renderAllCards') === 'y' ? products : products.slice(2, 14);
  const [selected, setSelected] = useState(cardList);

  useEffect(() => {
    const btn = document.querySelector("#showAll-btn");
    btn.addEventListener('click', () => {
      btn.innerText = "Fetching Items...";
      btn.style.backgroundColor = "rgb(78, 78, 78)";
      setTimeout(() => {
        setSelected(products);
        btn.style.opacity = 0;
      }, 1000);
      localStorage.setItem('renderAllCards', 'y');
    })
  })

  // initialize price range values and filter values
  const prices = [... new Set(products.map(product => product.price))];
  const prange = [Math.min(...prices), Math.max(...prices)];
  const filterDefault = { 'brand': 'All Brands', 'sort': 'None', 'priceRange': prange };
  let filter = JSON.parse(localStorage.getItem('filter')) ? JSON.parse(localStorage.getItem('filter')) : filterDefault;

  // initialize filter result flag
  const [filterResultFlag, setFilterResultFlag] = useState([false, false, false]);

  let isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      let filteredProducts;
      if (!isFilterEqual(filter, filterDefault)) {
        // if filter is not default value, remove the show-all button and apply filter
        localStorage.setItem('renderAllCards', 'y');
        filteredProducts = filterBrand(filter.brand, products);
        filteredProducts = filterSort(filter.sort, filteredProducts);
        filteredProducts = filterPrice(filter.priceRange, filteredProducts);
      } else {
        filteredProducts = products;
      }

      setSelected(filteredProducts);

      const tFlag = [false, false, false];
      tFlag[0] = filter.brand === 'All Brands' ? false : true;
      tFlag[1] = filter.sort === 'None' ? false : true;
      tFlag[2] = filter.priceRange[0] === 56 && filter.priceRange[1] === 674 ? false : true;
      setFilterResultFlag(tFlag);
    }
  }, [filterLocal])


  const clearFilter = (filterType) => {
    if (filterType === 'brand') {
      filter = { ...filter, 'brand': 'All Brands' };
    } else if (filterType === 'sort') {
      filter = { ...filter, 'sort': 'None' };
    } else {
      filter = { ...filter, 'priceRange': prange };
    }
    localStorage.setItem('filter', JSON.stringify(filter));
    setFilterLocal(!filterLocal);
  }


  return (
    <div className='shop'>
      {filterResultFlag.some(Boolean) ? <div className='shop--filterResult'>
        <p className='result-title'>Found {selected.length} products</p>
        <div className='result-box'>
          {filterResultFlag[0] && <div className='result-item'>
            <p className='small-text'>Brand</p>
            <div>
              <p className='small-text'>{filter.brand}</p>
              <XCircle className='clearIcon' size={24} onClick={() => clearFilter('brand')} />
            </div>
          </div>}
          {filterResultFlag[1] && <div className='result-item'>
            <p className='small-text'>Sort</p>
            <div>
              <p className='small-text'>{filter.sort}</p>
              <XCircle className='clearIcon' size={24} onClick={() => clearFilter('sort')} />
            </div>
          </div>}
          {filterResultFlag[2] && <div className='result-item'>
            <p className='small-text'>Price range</p>
            <div>
              <p className='small-text'>${filter.priceRange[0]} - ${filter.priceRange[1]}</p>
              <XCircle className='clearIcon' size={24} onClick={() => clearFilter('pricerange')} />
            </div>
          </div>}
        </div>
      </div> : ''}

      <div className='shop--grid'>
        {selected.map(item => {
          return <ProductCard2
            key={item.id}
            id={item.id}
          />
        })}
      </div>
      <button id="showAll-btn" style={{ opacity: localStorage.getItem('renderAllCards') === 'y' ? 0 : 1 }}>Show More Items</button>
    </div>
  )
}


// auxiliary functions
function isFilterEqual(object1, object2) {
  return object1.brand === object2.brand && object1.sort === object2.sort && object1.priceRange[0] === object2.priceRange[0] && object1.priceRange[1] === object2.priceRange[1];
}

function filterBrand(brand, products) {
  if (brand === 'All Brands') {
    return products
  } else {
    return products.filter(product => product.brand === brand)
  }
}

function filterSort(sort, products) {
  if (sort === 'None') {
    return products
  } else if (sort === 'Name Ascending A - Z') {
    return products.sort(compareNames)
  } else if (sort === 'Name Descending Z - A') {
    return products.sort(compareNames).toReversed()
  } else if (sort === 'Price Low - High') {
    return products.sort(compareNumbers)
  } else {
    return products.sort(compareNumbers).toReversed()
  }
}

function filterPrice(priceRange, products) {
  return products.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
}

function compareNames(a, b) {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}

function compareNumbers(a, b) {
  return a - b;
}