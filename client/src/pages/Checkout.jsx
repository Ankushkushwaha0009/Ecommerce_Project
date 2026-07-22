import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ShippingForm from "../components/ShippingForm";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <ShippingForm
          shippingData={shippingData}
          setShippingData={setShippingData}
        />
      </div>

      <div className="w-full md:w-80">
        <OrderSummary isCheckout={true} shippingData={shippingData} />
      </div>
    </div>
  );
};

export default Checkout;
