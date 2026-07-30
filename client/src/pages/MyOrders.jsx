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

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.map((order, id) => (
        <div key={id} className="border rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-shadow"> Order Id </h2>
          <p> {order._id} </p>
          <p className="mt-2">Total Price : ₹{order.totalPrice}</p>
          <p> Payment Status : {order.paymentStatus}</p>
          <p> Order Status : {order.orderStatus}</p>
          <hr className="my-4" />
          {order.items.map((item) => (
            <div key={item._id} className="border rounded p-3 mb-3">
              <p> Product : {item.product.name} </p>
              <p> Quantity : {item.quantity} </p>
              <p> Price : ₹{item.price} </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
