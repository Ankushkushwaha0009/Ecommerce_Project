import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        overflow-hidden
        group
        ${product.featured ? "ring-2 ring-green-500" : ""}
      `}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">

        {/* Discount Badge */}
        {discount > 0 && (
          <span
            className="
              absolute
              top-3
              left-3
              bg-red-500
              text-white
              text-xs
              px-3
              py-1
              rounded-full
              z-10
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <span
            className="
              absolute
              top-12
              left-3
              bg-green-600
              text-white
              text-xs
              px-3
              py-1
              rounded-full
              z-10
            "
          >
            Featured
          </span>
        )}

        {/* Out Of Stock */}
        {product.stock === 0 && (
          <span
            className="
              absolute
              bottom-3
              left-3
              bg-black
              text-white
              px-3
              py-1
              rounded-full
              text-xs
              z-10
            "
          >
            Out of Stock
          </span>
        )}

        {/* Wishlist */}
        <button
          className="
            absolute
            top-3
            right-3
            bg-white
            p-2
            rounded-full
            shadow
            hover:scale-110
            transition
            z-10
          "
        >
          <FaHeart className="text-red-500" />
        </button>

        <Link to={`/product/${product._id}`}>
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-56
              object-cover
              group-hover:scale-110
              transition-transform
              duration-500
            "
          />
        </Link>
      </div>

      {/* Details */}
      <div className="p-4">

        {/* Product Name */}
        <h2 className="text-lg font-semibold line-clamp-1 min-h-[28px]">
          {product.name}
        </h2>

        {/* Brand */}
        <p className="text-sm text-gray-400 mt-1">
          {product.brand}
        </p>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <FaStar className="text-yellow-500" />

          <span className="font-medium text-sm">
            {product.rating}
          </span>

          <span className="text-gray-400 text-sm">
            ({product.reviews} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-2xl font-bold text-black">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-3">

          {/* Add To Cart */}
          <button
            disabled={product.stock === 0}
            className={`
              w-full
              py-3
              rounded-xl
              transition
              ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black hover:bg-gray-800 text-white"
              }
            `}
          >
            <div className="flex justify-center items-center gap-2">
              <FaShoppingCart />
              Add To Cart
            </div>
          </button>

          {/* Buy Now */}
          <button
            disabled={product.stock === 0}
            className={`
              w-full
              border
              py-3
              rounded-xl
              transition
              ${
                product.stock === 0
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-black hover:bg-black hover:text-white"
              }
            `}
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;