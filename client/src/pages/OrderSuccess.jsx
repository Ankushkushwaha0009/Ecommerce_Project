import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">

        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us.
          Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
};

export default OrderSuccess;