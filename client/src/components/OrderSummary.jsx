import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = ({ shippingData }) => {
  const { cart, totalItems, totalPrice } = useContext(CartContext);

  const handlePlaceOrder = () => {
    console.log(shippingData);

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
      "country",
    ];

    const fieldNames = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      address: "Address",
      city: "City",
      state: "State",
      pincode: "Pincode",
      country: "Country",
    };

    for (let i = 0; i < requiredFields.length; i++) {
      if (!shippingData[requiredFields[i]].trim()) {
        toast.error(`${fieldNames[requiredFields[i]]} is required`);
        return;
      }
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(shippingData.email)) {
    toast.error("Please enter a valid email address...");
    return;
  }

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

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
