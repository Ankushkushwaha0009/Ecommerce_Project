import React from "react";
import ShippingForm from "../components/ShippingForm";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  return (
    <div className="flex gap-6">
      <div>
        <ShippingForm />
      </div>
      <div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
