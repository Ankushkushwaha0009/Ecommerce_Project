import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  const getPayementStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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

              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm mt-2">
                {order.paymentStatus}
              </span>

              <br />

              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mt-2">
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
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
