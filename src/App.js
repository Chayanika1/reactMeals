import React, { Fragment, useState } from 'react';
import Header from './Componants/Layout/Header';
import Meals from './Componants/Meals/Meals';
import Cart from './Componants/Cart/Cart';
import CartProvider from './Store/CartProvider';
const App = () => {
  const[cartShown,setCartShown] = useState(false);
  const showCartHandler=()=>{
    setCartShown(true)
  }
  const hideCartHandler=()=>{
    setCartShown(false)
  }
  return (
    <CartProvider>
      {cartShown &&<Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
      
    </CartProvider>
  );
};

export default App;