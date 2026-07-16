import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          🛍 ShopEasy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">

          <Link
            to="/"
            className="hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            to="/category/jewellery"
            className="hover:text-yellow-400"
          >
            Jewellery
          </Link>

          <Link
            to="/category/clothes"
            className="hover:text-yellow-400"
          >
            Clothes
          </Link>

        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex gap-5 items-center">

          <Link
            to="/login"
            className="hover:text-yellow-400"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-yellow-400"
          >
            Register
          </Link>

          <button className="text-2xl">
            🛒
          </button>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 flex flex-col px-5 py-4 gap-4">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/category/jewellery"
            onClick={() => setMenuOpen(false)}
          >
            Jewellery
          </Link>

          <Link
            to="/category/clothes"
            onClick={() => setMenuOpen(false)}
          >
            Clothes
          </Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;