import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // check if product is exist or not .....
      const existingItem = prevCart.find((item) => {
        return item.product._id === product._id;
      });

      // product already exist...
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // otherwsise add new product
      return [
        ...prevCart,
        {
          product,
          quantity,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        return item.product._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    });
  };

  const removeCart = (productId) => {
    setCart((prevCart) => {
        return prevCart.filter((item) => {
          return item.product._id !== productId;
        });
      });
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
