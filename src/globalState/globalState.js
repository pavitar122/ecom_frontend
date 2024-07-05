import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const existingCart = localStorage.getItem("CartData");
    const existingUser = localStorage.getItem("userData");

    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }

    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);



  return (
    <CartContext.Provider value={{ cart, setCart, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
