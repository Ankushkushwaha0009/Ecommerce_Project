import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">🛒 Your Cart is Empty</h1>
        <p className="text-gray-500 mt-3">
          Start shopping to add products.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {/* Cart Items */}

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-6 border rounded-xl p-4 shadow"
          >
            {/* Product Image */}

            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            {/* Product Details */}

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {item.product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.product.description}
              </p>

              <p className="text-xl font-bold mt-3">
                ₹{item.product.price}
              </p>

              <p className="mt-2">
                Subtotal : ₹
                {item.product.price * item.quantity}
              </p>
            </div>

            {/* Quantity */}

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.product._id)}
                className="px-4 py-2 border rounded"
              >
                -
              </button>

              <span className="text-xl">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.product._id)}
                className="px-4 py-2 border rounded"
              >
                +
              </button>
            </div>

            {/* Remove */}

            <button
              onClick={() => removeCart(item.product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}

      <div className="mt-10 border rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">
          Order Summary
        </h2>

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
    </div>
  );
};

export default CartPage;