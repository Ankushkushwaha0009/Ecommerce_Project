const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Original price before discount
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Product Brand
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Clothes",
        "Shoes",
        "Jewellery",
        "Electronics",
        "Watches",
        "Bags",
      ],
      required: true,
    },

    // Main image
    image: {
      type: String,
      required: true,
    },

    // Multiple product images
    images: [
      {
        type: String,
      },
    ],

    // Available Colors
    colors: [
      {
        type: String,
      },
    ],

    // Available Sizes
    sizes: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Average rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Number of reviews
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Featured product
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
