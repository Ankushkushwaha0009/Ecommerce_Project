import React from "react";
import { useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import HeroBanner from "../components/HeroBanner";

const categories = [
  {
    id: 1,
    name: "Clothes",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  },
  {
    id: 2,
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800",
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 4,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
  },
];

const Home = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProduct(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
    
      <SearchBar />
      <HeroBanner />

      {/* Categories */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
