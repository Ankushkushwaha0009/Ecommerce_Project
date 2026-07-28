const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { shippingAddress, items, totalPrice } = req.body;

  //   console.log(req.user) ;

  if (!shippingAddress || !items || !totalPrice) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields..",
    });
  }

  try {
    const order = new Order({
      shippingAddress,
      items,
      totalPrice,
    });
    await order.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders
};
