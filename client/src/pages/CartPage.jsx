import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/CartCard";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

      {/* Left Side */}
      <div className="flex-1">
        {cart.map((item) => (
          <CartCard
            key={item.product._id}
            item={item}
          />
        ))}
      </div>

      {/* Right Side */}
      <div className="w-full md:w-80">
        <OrderSummary />
      </div>

    </div>
  );
};

export default CartPage;