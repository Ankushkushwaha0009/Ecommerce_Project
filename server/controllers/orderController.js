const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({
      success: true,
      message: "Order route is working",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
};
