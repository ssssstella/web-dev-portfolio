import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Routerview from "./view/Routerview";
import { BrowserRouter } from "react-router-dom";
import "./sass/index.css";
import MainContext from './component/context/Context';
import {useState, useEffect} from 'react';
import { db, auth } from "./services/firebase.config";
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from "firebase/auth";


function App() {
  const dataList = [];
  const [authUser, setAuthUser] = useState(null);
 
  useEffect(() => {
      const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "glasses"));
        querySnapshot.forEach(doc => {
          dataList.push({...doc.data(), isAdded: false})
        } )
        // console.log(dataList);
      }
      getData();
    }, []);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    })

    return () => {
      listen();
    }
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
      }).catch((error) => {
        console.log(error);
      })
  }
  
  const [products, setProducts] = useState(dataList);
  const [cartLocal, setCartLocal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [filterLocal, setFilterLocal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);

  
  return (
    <MainContext.Provider value={{products, setProducts, 
            cartLocal, setCartLocal, showCart, setShowCart,
            filterLocal, setFilterLocal, showFilter, setShowFilter, 
            showShopModal, setShowShopModal, authUser, userSignOut}}>
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
