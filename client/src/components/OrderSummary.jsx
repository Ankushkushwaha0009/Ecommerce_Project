import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const OrderSummary = () => {
  
  const { cart, totalItems, totalPrice } = useContext(CartContext);

  return (
    <div className="mt-10 border rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-3">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between mb-5">
        <span>Total Price</span>
        <span>₹{totalPrice}</span>
      </div>

      <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800">
        Proceed To Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
