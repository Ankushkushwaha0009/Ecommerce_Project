import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartCard = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeCart } =
    useContext(CartContext);

  const { product, quantity } = item;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-5">
      <div className="flex gap-6">

        {/* Product Image */}
        <div>
          <img
            className="w-40 h-40 object-cover rounded-lg border"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold">
            {product.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {product.description}
          </p>

          <h3 className="text-2xl font-semibold text-green-600 mt-4">
            ₹{product.price * item.quantity}
          </h3>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-5">

            <button
              onClick={() => decreaseQuantity(product._id)}
              className="w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
            >
              -
            </button>

            <span className="text-xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => increaseQuantity(product._id)}
              className="w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
            >
              +
            </button>

          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeCart(product._id)}
            className="mt-5 text-red-600 font-medium hover:text-red-700 transition"
          >
            🗑 Remove
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartCard;