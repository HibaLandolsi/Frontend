import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import CartContext from "./store";
import CartPage from "./CartPage";
import SellPage from "./SellPage";


export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(val => [...val, item])
    const local = localStorage.getItem('cart') || '[]';
    let json = JSON.parse(local);
    json = [...json, item]
    localStorage.setItem('cart', JSON.stringify(json));
  }

  function removeFromCart(item) {
    setCart(val => val.filter(i => i.id !== item.id))
    const local = localStorage.getItem('cart') || '[]';
    let json = JSON.parse(local);
    json = json.filter(i => i.id !== item.id)
    localStorage.setItem('cart', JSON.stringify(json));
  }

  useEffect(() => {
    const local = localStorage.getItem('cart');
    const json = local ? JSON.parse(local) : [];
    setCart(json);
  }, [])

  return (
    <CartContext.Provider value={{
      cart, addItemToCart: addToCart, removeFromCart
    }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}
