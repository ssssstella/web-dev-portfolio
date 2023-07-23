import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MainContext from '../context/Context';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import "./sass/filter.css";

export default function Filter() {
    // get 'products' state 
    const { products, filterLocal, setFilterLocal, setShowFilter} = useContext(MainContext);

    // initialize brand select values
    const brands = [...new Set(products.map(product => product.brand))];
    brands.unshift('All Brands');

    // initialize sortBy select values
    const sortBy = [{ label: 'None', value: null },
    { label: 'Name Ascending A - Z', value: ['name', 'a'] },
    { label: 'Name Descending Z - A', value: ['name', 'd'] },
    { label: 'Price High - Low', value: ['price', 'd'] },
    { label: 'Price Low - High', value: ['price', 'a'] }]

    // initialize price range values
    const prices = [...new Set(products.map(product => product.price))];
    const prange = [Math.min(...prices), Math.max(...prices)];

    // fetch filter value
    let filter;
    if (!JSON.parse(localStorage.getItem('filter'))) {
        filter = {'brand': 'All Brands', 'sort': 'None', 'priceRange': prange};
        localStorage.setItem('filter', JSON.stringify(filter));
        setFilterLocal(!filterLocal);
    } else {
        filter = JSON.parse(localStorage.getItem('filter'));
    }


    // brand select
    const [brand, setBrand] = useState(filter.brand || 'All Brands');
    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };
    const brandItemHTML = brands.map((brand, idx) => <MenuItem key={idx} value={brand}>{brand}</MenuItem>);

    // sortBy select
    const [sort, setSort] = useState(filter.sort || 'None');
    const handleSortChange = (e) => {
        setSort(e.target.value);
    };
    const sortItemHTML = sortBy.map((option, idx) => <MenuItem key={idx} value={option.label}>{option.label}</MenuItem>);

    // price range select
    const [priceRange, setPriceRange] = React.useState(filter.priceRange || prange);

    const handlePriceRangeChange = (e, newRange) => {
        setPriceRange(newRange);
    };

    const priceMarks = [
        {
            value: 100,
            label: '100',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 300,
            label: '300',
        },
        {
            value: 400,
            label: '400',
        },
        {
            value: 500,
            label: '500',
        },
        {
            value: 600,
            label: '600',
        },
    ];


    const applyFilter = () => {
        filter = {'brand': brand, 'sort': sort, 'priceRange': priceRange};
        setShowFilter(false);
        localStorage.setItem('filter', JSON.stringify(filter));
        setFilterLocal(!filterLocal);
    }

    const resetFilter = () => {
        filter = {'brand': 'All Brands', 'sort': 'None', 'priceRange': prange};
        setShowFilter(false);
        localStorage.setItem('filter', JSON.stringify(filter));
        setFilterLocal(!filterLocal);
    }

    return (
        <div className="filter">
            <div className="filter--selector">
                <FormControl sx={{ m: 1, minWidth: 120 }} className="select">
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        id="brand-select"
                        value={brand}
                        label="brand"
                        onChange={handleBrandChange}
                    >
                        {brandItemHTML}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} className="select">
                    <InputLabel id="sortBy-select-label">Sortby</InputLabel>
                    <Select
                        labelId="sortBy-select-label"
                        id="sortBy-select"
                        value={sort}
                        label="sortBy"
                        onChange={handleSortChange}
                    >
                        {sortItemHTML}
                    </Select>
                </FormControl>
            </div>
            <div className="filter--selector">
                <p className='small-text'>Price Range</p>
                <h4>${priceRange[0]} - ${priceRange[1]}</h4>
                <Box>
                    <Slider
                        sx={{height: 14, color: '#52af77'}}
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        max={prange[1]}
                        min={prange[0]}
                        marks={priceMarks}
                    />
                </Box>
            </div>
            <div className="filter--btn">
                <button onClick={applyFilter}>Apply filters</button>
                <button className='btn-light' onClick={resetFilter}>Reset filters</button>
            </div>
        </div>
    )
}
