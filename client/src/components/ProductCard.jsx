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
        bg-[#FDF6EC]
        rounded-xl
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        overflow-hidden
        group
        ${product.featured ? "ring-2 ring-[#FF6B4A]" : ""}
      `}
    >
      {/* Image Section — square instead of 3:4, shaves real height off every card */}
      <div className="relative overflow-hidden bg-[#0B3C3E]/5 aspect-square">

        <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
          {discount > 0 && (
            <span className="bg-[#FF6B4A] text-[#FDF6EC] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-[#0B3C3E] text-[#FFD166] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>

        {product.stock === 0 && (
          <span className="absolute bottom-2 left-2 bg-[#0B3C3E] text-[#FDF6EC] px-2 py-0.5 rounded-full text-[11px] z-10">
            Out of Stock
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="
            absolute top-2 right-2 z-10
            bg-[#FDF6EC] p-1.5 rounded-full shadow
            transition hover:scale-110
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2
          "
        >
          <FaHeart className="text-[#FF6B4A] text-sm" />
        </button>

        <Link to={`/product/${product._id}`}>
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-500
            "
          />
        </Link>

        <button
          disabled={product.stock === 0}
          className={`
            absolute bottom-0 left-0 right-0 z-10
            py-2 text-xs font-semibold
            translate-y-full group-hover:translate-y-0
            transition-transform duration-300
            ${
              product.stock === 0
                ? "bg-[#0B3C3E]/30 text-[#FDF6EC]/60 cursor-not-allowed"
                : "bg-[#0B3C3E] text-[#FDF6EC] hover:bg-[#0B3C3E]/90"
            }
          `}
        >
          Buy Now
        </button>
      </div>

      {/* Details — tighter padding, tighter vertical rhythm */}
      <div className="px-2.5 py-2">

        <p className="text-[10px] text-[#0B3C3E]/50 uppercase tracking-wide">
          {product.brand}
        </p>

        <h2 className="text-sm font-semibold text-[#0B3C3E] line-clamp-1 leading-tight mt-0.5">
          {product.name}
        </h2>

        <div className="inline-flex items-center gap-1 bg-[#0B3C3E]/5 rounded px-1.5 py-0.5 mt-1">
          <FaStar className="text-[#FFD166] text-[10px]" />
          <span className="font-medium text-xs text-[#0B3C3E]">
            {product.rating}
          </span>
          <span className="text-[#0B3C3E]/40 text-xs">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
          <span className="font-serif text-base font-bold text-[#0B3C3E]">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-[#0B3C3E]/40 text-xs line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-[#FF6B4A] text-xs font-semibold">
                {discount}% off
              </span>
            </>
          )}
        </div>

        <button
          disabled={product.stock === 0}
          className={`
            mt-2 w-full py-1.5 rounded-lg transition text-sm font-medium
            flex justify-center items-center gap-2
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2
            ${
              product.stock === 0
                ? "bg-[#0B3C3E]/20 cursor-not-allowed text-[#0B3C3E]/50"
                : "bg-[#0B3C3E] hover:bg-[#FF6B4A] text-[#FDF6EC]"
            }
          `}
        >
          <FaShoppingCart className="text-xs" />
          Add To Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;