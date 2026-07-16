import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-5">
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-black">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none px-3 text-gray-700"
        />
      </div>
    </div>
  );
}

export default SearchBar;