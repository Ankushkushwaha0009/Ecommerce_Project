import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  /*
     product = {
       _id : 123
        name :  "nike"; 
        brand : "cotton" ;
        price : 3773
     }

     cart = [

            {
                product = {
                    _id : 123
                    name :  "nike"; 
                    brand : "cotton" ;
                    price : 3773 
                } , 
                 quantity : 1
            }  
         } , 


     ]
*/

  const addToCart = (product) => {
    setCart((prevCart) => {
      
      const existingItem = prevCart.find((item) => {
        return item.product._id === product._id;
      });

      // if it exist increase the quantity ....
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // otherwsise add new product
      return [
        ...prevCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
