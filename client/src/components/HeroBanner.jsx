import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-[#0B3C3E] rounded-3xl overflow-hidden">

        {/* Subtle texture: radial glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FF6B4A]/20 blur-3xl" />

        <div className="relative grid md:grid-cols-2 items-center">

          {/* Left */}
          <div className="relative z-10 p-8 md:p-14">

            <span className="inline-flex items-center gap-2 bg-[#FFD166] text-[#0B3C3E] px-4 py-1.5 rounded-full font-semibold text-sm tracking-wide">
              ☀️ Summer Collection
            </span>

            <h1 className="font-serif text-5xl md:text-7xl text-[#FDF6EC] font-bold mt-6 leading-[0.95] tracking-tight">
              Up to <span className="text-[#FF6B4A]">50% off</span>
            </h1>

            <p className="text-[#FDF6EC]/70 mt-5 text-lg max-w-sm">
              Premium fashion, shoes and jewellery — dressed for the season, priced for it too.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-[#FDF6EC] text-[#0B3C3E] px-8 py-3 rounded-full font-semibold
                         transition hover:bg-[#FF6B4A] hover:text-[#FDF6EC]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3C3E]"
            >
              Shop Now
            </Link>

          </div>

          {/* Right */}
          <div className="relative h-72 md:h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
              alt="Fashion Banner"
              className="w-full h-full object-cover"
            />
            {/* Duotone wash to tie the image into the palette */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0B3C3E]/0 via-[#0B3C3E]/0 to-[#0B3C3E]/60 md:to-transparent" />
          </div>

        </div>

        {/* Signature element: diagonal marquee ribbon across the seam */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 w-[140%] z-20 pointer-events-none">
          <div className="overflow-hidden bg-[#FF6B4A] py-2 shadow-lg">
            <div className="flex whitespace-nowrap motion-safe:animate-[marquee_18s_linear_infinite] motion-reduce:justify-center">
              {Array(8).fill("SUMMER SALE  •  UP TO 50% OFF  •").map((t, i) => (
                <span key={i} className="mx-4 text-[#0B3C3E] font-bold uppercase tracking-widest text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroBanner;