import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Payment status color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Order status color
  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // No orders
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-5">📦</div>

          <h1 className="text-3xl font-bold mb-3">My Orders</h1>

          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>

        <p className="text-gray-500 mt-2">Track and manage your orders</p>
      </div>

      {/* Orders */}
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-xl p-5 md:p-7 mb-7 shadow-sm bg-white"
        >
          {/* Order Header */}
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="md:text-right">
              <p className="font-bold text-2xl">₹{order.totalPrice}</p>

              {/* Payment Status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getPaymentStatusColor(
                  order.paymentStatus,
                )}`}
              >
                Payment: {order.paymentStatus}
              </span>

              {/* Order Status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ml-2 ${getOrderStatusColor(
                  order.orderStatus || "Pending",
                )}`}
              >
                {order.orderStatus || "Pending"}
              </span>
            </div>
          </div>

          <hr className="mb-6" />

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-5 border rounded-lg p-4 mb-4"
              >
                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>

                  <p className="text-gray-600 mt-1">
                    Brand: {item.product.brand}
                  </p>

                  <p className="text-gray-600">
                    Category: {item.product.category}
                  </p>

                  <div className="flex flex-wrap gap-5 mt-2">
                    <p>
                      Quantity:{" "}
                      <span className="font-semibold">{item.quantity}</span>
                    </p>

                    <p className="font-bold">₹{item.price}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => addToCart(item.product)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      Buy Again
                    </button>

                    <button
                      onClick={() => navigate(`/product/${item.product._id}`)}
                      className="border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-7 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">📍 Shipping Address</h3>

            <div className="bg-gray-50 rounded-lg p-5">
              <p className="font-semibold text-lg">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>

              <p className="text-gray-700 mt-2">
                {order.shippingAddress.address}
              </p>

              <p className="text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </p>

              <p className="text-gray-700">{order.shippingAddress.country}</p>

              <div className="mt-4 space-y-1 text-gray-700">
                <p>📧 {order.shippingAddress.email}</p>

                <p>📞 {order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
