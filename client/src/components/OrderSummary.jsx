import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ shippingData, isCheckout }) => {
  const { cart, totalItems, totalPrice , clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  console.log("OrderSummary:", shippingData);

  const handlePlaceOrder = async () => {
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
      if (!shippingData[requiredFields[i]]?.trim()) {
        toast.error(`${fieldNames[requiredFields[i]]} is required`);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(shippingData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(shippingData.phone)) {
      toast.error("Please enter a valid 10 digit phone number");
    }

    const pincodeRegex = /^[0-9]{6}$/;

    if (!pincodeRegex.test(shippingData.pincode)) {
      toast.error("Please enter a valid 6 digit pincode");
      return;
    }

    const orderItems = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        shippingAddress: shippingData,
        items: orderItems,
        totalPrice,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      clearCart() ; 
      navigate("/order-success");
    } else {
      toast.error(data.message);
    }

    // console.log(orderItems);
    // console.log("Validation Passed");
  };

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

      {isCheckout ? (
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
        >
          Place Order
        </button>
      ) : (
        <Link
          to="/checkout"
          className="block w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 text-center"
        >
          Proceed To Checkout
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;
