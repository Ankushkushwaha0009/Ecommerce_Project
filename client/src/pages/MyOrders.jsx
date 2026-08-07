import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem("token");
  console.log(token);

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
    fetchOrders();
  }, []);

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

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.map((order, id) => (
        <div key={id} className="border rounded-lg p-6 mb-6 shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-xl">₹{order.totalPrice}</p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getPaymentStatusColor(
                  order.paymentStatus,
                )}`}
              >
                {order.paymentStatus}
              </span>
              <br />

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getOrderStatusColor(
                  order.orderStatus || "Pending",
                )}`}
              >
                {order.orderStatus || "Pending"}
              </span>
            </div>
          </div>

          <hr className="mb-5" />
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex gap-5 border rounded-lg p-4 mb-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.product.name}</h2>

                <p className="text-gray-600">Brand : {item.product.brand}</p>

                <p className="text-gray-600">
                  Category : {item.product.category}
                </p>

                <p className="mt-2">Quantity : {item.quantity}</p>

                <p className="font-bold text-lg mt-2">₹{item.price}</p>

                <div className="flex gap-3 mt-4">
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

          <div className="mt-6 border-t pt-5">
            <h3 className="text-lg font-semibold mb-3">📍 Shipping Address</h3>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-lg">
                {order.shippingAddress.firstName}
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

              <div className="mt-4 space-y-1">
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
