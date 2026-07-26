const Order = require("../models/Order");

const createOrder = async (req, res) => {

  const { shippingAddress, items, totalPrice } = req.body;

  if (!shippingAddress || !items || !totalPrice) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields..",
    });
  }

  try {
    const order = new Order({
      user: req.user.id,
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

module.exports = {
  createOrder,
};