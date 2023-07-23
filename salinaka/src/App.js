import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Routerview from "./view/Routerview";
import { BrowserRouter } from "react-router-dom";
import "./sass/index.css";
import MainContext from './component/context/Context';
import {useState, useEffect} from 'react';
import data from "./data";


function App() {
  const dataList = data.map(item => {
      return {...item, isAdded: false}
  })

  const [products, setProducts] = useState(dataList);
  const [cartLocal, setCartLocal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [filterLocal, setFilterLocal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  


  return (
    <MainContext.Provider value={{products, setProducts, 
            cartLocal, setCartLocal, showCart, setShowCart,
            filterLocal, setFilterLocal, showFilter, setShowFilter, showShopModal, setShowShopModal}}>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routerview />
          <Footer />
        </BrowserRouter>
      </div>
    </MainContext.Provider>
  );
}

export default App;
