import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useContext(CartContext);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🛍 ShopEasy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>

          <Link to="/category/jewellery" className="hover:text-yellow-400">
            Jewellery
          </Link>

          <Link to="/category/clothes" className="hover:text-yellow-400">
            Clothes
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex gap-5 items-center">
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>

          <Link to="/register" className="hover:text-yellow-400">
            Register
          </Link>

          <Link to="/cart" className="realtive text-2xl">
            🛒
            {totalItems > 0 && (
              <span
                className="absolute
                -top-2
                -right-3
                bg-red-500
                text-white
                text-xs
                rounded-full
                w-5
                h-5
                flex
                items-center
                justify-center"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 flex flex-col px-5 py-4 gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/category/jewellery" onClick={() => setMenuOpen(false)}>
            Jewellery
          </Link>

          <Link to="/category/clothes" onClick={() => setMenuOpen(false)}>
            Clothes
          </Link>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            🛒 Cart ({totalItems})
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
