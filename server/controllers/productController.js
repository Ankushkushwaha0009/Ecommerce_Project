const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      brand,
      category,
      image,
      images,
      colors,
      sizes,
      stock,
      rating,
      reviews,
      featured,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !originalPrice ||
      !brand ||
      !category ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      brand,
      category,
      image,
      images,
      colors,
      sizes,
      stock,
      rating,
      reviews,
      featured,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(401).json({ success : false , message: "Product not found .." });
    }
    return res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({success: false , message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found .." });
    }

    return res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({success : false , message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
