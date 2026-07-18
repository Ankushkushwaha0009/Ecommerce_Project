import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedmImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.product);
        setSelectedmImage(res.data.product.image);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">Loading Product .....</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500">Product not found ..</div>
    );
  }

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

    // const productData =  {
    //     product , 
    //     quantity , 
    // }

    // console.log(product)  ; 

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left */}

        <div className="flex gap-4">
          {/* Thumbnails */}

          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((_, index) => (
              <img
                key={index}
                src={product.image}
                alt="Thumbnail"
                onClick={() => setSelectedImage(product.image)}
                className="
                    w-20
                    h-20
                    object-contain
                    border
                    rounded-lg
                  bg-white
                    p-1
                    cursor-pointer"
              />
            ))}
          </div>

          {/* Main Image */}

          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.name}
              className="
    w-full
    max-h-125
    object-contain
    rounded-xl
    shadow-lg
    bg-gray-100
      "
            />
          </div>
        </div>
        {/* Right */}

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-blue-600 font-medium mt-2">{product.category}</p>
          <p className="text-gray-500 mt-2">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            ⭐⭐⭐⭐⭐
            <span>
              {product.rating} ({product.reviews} Reviews)
            </span>
          </div>

          {/* Price */}

          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.originalPrice}
            </span>
            <span className="text-green-600 font-semibold">
              {discount}% OFF
            </span>
          </div>

          {/* Stock */}

          <p className="mt-4 font-medium">
            {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Quantity */}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2 border rounded"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              disabled={product.stock === 0}
              onClick={() => addToCart(product , quantity)}
              className={`flex-1 py-3 rounded-xl ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Add to Cart
            </button>
            <button className="flex-1 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

/* 
[ 
   {
        {
         _id: "1",
          name: "Nike Air Max",
          price: 8999 , 
      } ,
      quantity  : 3
   }
]

*/