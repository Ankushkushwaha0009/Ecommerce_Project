import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = ({ shippingData, isCheckout }) => {
  const { cart, totalItems, totalPrice, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    // --------------------------------
    // 1. Validate shipping fields
    // --------------------------------

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
      "country",
    ];

    const fieldNames = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      address: "Address",
      city: "City",
      state: "State",
      pincode: "Pincode",
      country: "Country",
    };

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];

      if (!shippingData[field]?.trim()) {
        toast.error(`${fieldNames[field]} is required`);
        return;
      }
    }

    // --------------------------------
    // 2. Validate email
    // --------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(shippingData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // --------------------------------
    // 3. Validate phone
    // --------------------------------

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(shippingData.phone)) {
      toast.error("Please enter a valid 10 digit phone number");
      return;
    }

    // --------------------------------
    // 4. Validate pincode
    // --------------------------------

    const pincodeRegex = /^[0-9]{6}$/;

    if (!pincodeRegex.test(shippingData.pincode)) {
      toast.error("Please enter a valid 6 digit pincode");
      return;
    }

    // --------------------------------
    // 5. Check cart
    // --------------------------------

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // --------------------------------
    // 6. Prepare order items
    // --------------------------------

    const orderItems = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login before placing an order");
      navigate("/login");
      return;
    }

    try {
      // ============================================
      // STEP 1: CREATE RAZORPAY ORDER
      // ============================================

      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            amount: totalPrice,
          }),
        },
      );

      const data = await response.json();

      console.log("Razorpay Order:", data);

      if (!data.success) {
        toast.error(data.message || "Failed to create Razorpay order");
        return;
      }

      // ============================================
      // STEP 2: OPEN RAZORPAY CHECKOUT
      // ============================================

      const options = {
        key: "rzp_test_TQAYZ2cKDWULHa",

        amount: data.order.amount,

        currency: data.order.currency,

        name: "ShopEasy",

        description: "E-Commerce Purchase",

        order_id: data.order.id,

        handler: async function (paymentResponse) {
          console.log(
            "Payment Response:",
            paymentResponse,
          );

          try {
            // ============================================
            // STEP 3: VERIFY PAYMENT
            // ============================================

            const verifyResponse = await fetch(
              "http://localhost:5000/api/payment/verify-payment",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,
                }),
              },
            );

            const verifyData =
              await verifyResponse.json();

            console.log(
              "Verification Response:",
              verifyData,
            );

            // ============================================
            // STEP 4: PAYMENT VERIFIED
            // ============================================

            if (!verifyData.success) {
              toast.error(
                verifyData.message ||
                  "Payment verification failed",
              );

              return;
            }

            toast.success(
              "Payment verified successfully",
            );

            // ============================================
            // STEP 5: CREATE MONGODB ORDER
            // ============================================

            const orderResponse = await fetch(
              "http://localhost:5000/api/orders",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                  shippingAddress: shippingData,

                  items: orderItems,

                  totalPrice: totalPrice,

                  razorpayOrderId:
                    paymentResponse.razorpay_order_id,

                  razorpayPaymentId:
                    paymentResponse.razorpay_payment_id,
                }),
              },
            );

            const orderData =
              await orderResponse.json();

            console.log(
              "MongoDB Order Response:",
              orderData,
            );

            // ============================================
            // STEP 6: ORDER CREATED
            // ============================================

            if (!orderData.success) {
              toast.error(
                orderData.message ||
                  "Payment successful but order creation failed",
              );

              return;
            }

            toast.success(
              "Order placed successfully!",
            );

            // ============================================
            // STEP 7: CLEAR CART
            // ============================================

            clearCart();

            // ============================================
            // STEP 8: GO TO ORDER SUCCESS PAGE
            // ============================================

            navigate("/order-success");
          } catch (error) {
            console.error(
              "Payment / Order Error:",
              error,
            );

            toast.error(
              "Something went wrong after payment",
            );
          }
        },

        // ============================================
        // PREFILL USER INFORMATION
        // ============================================

        prefill: {
          name: `${shippingData.firstName} ${shippingData.lastName}`,

          email: shippingData.email,

          contact: shippingData.phone,
        },

        // ============================================
        // RAZORPAY THEME
        // ============================================

        theme: {
          color: "#000000",
        },
      };

      // ============================================
      // STEP 9: OPEN RAZORPAY
      // ============================================

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "Create Razorpay Order Error:",
        error,
      );

      toast.error(
        "Unable to start payment",
      );
    }
  };

  return (
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

      {isCheckout ? (
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
        >
          Place Order
        </button>
      ) : (
        <Link
          to="/checkout"
          className="block w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 text-center"
        >
          Proceed To Checkout
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;