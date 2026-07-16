import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl overflow-hidden">

        <div className="grid md:grid-cols-2 items-center">

          {/* Left */}

          <div className="p-8 md:p-14">

            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">
              🔥 Summer Collection
            </span>

            <h1 className="text-4xl md:text-6xl text-white font-bold mt-6 leading-tight">
              Up to 50% OFF
            </h1>

            <p className="text-gray-300 mt-5 text-lg">
              Discover premium fashion, shoes and jewellery
              at unbeatable prices.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              Shop Now
            </Link>

          </div>

          {/* Right */}

          <div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
              alt="Fashion Banner"
              className="w-full h-72 md:h-[500px] object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroBanner;