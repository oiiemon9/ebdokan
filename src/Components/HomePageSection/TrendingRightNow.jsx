'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// ── Product card — horizontal layout (image left, text right) ──────────────
function TrendingCard({ product }) {
  const price = Number(String(product.price).replace(/,/g, ''));
  const comparePrice = product.comparePrice
    ? Number(String(product.comparePrice).replace(/,/g, ''))
    : null;

  return (
    <Link
      href={`/products/${product._id}`}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl
        px-4 py-3.5 h-full
        hover:border-green-300 hover:shadow-[0_4px_20px_rgba(79,70,229,0.08)]
        transition-all duration-200 group mx-1"
    >
      {/* Product image */}
      <div className="w-[70px] h-[70px] shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.productName}
            width={70}
            height={70}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-200">
            📦
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {/* Category */}
        <p className="text-secondary text-[10px] font-black tracking-wider uppercase mb-1 truncate">
          {product.category}
        </p>

        {/* Product name */}
        <h3
          className="text-accent text-[13px] font-semibold leading-snug mb-2 line-clamp-2
          group-hover:text-green-600 transition-colors"
        >
          {product.productName}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-black text-sm">
            ${product.price}
          </span>
          {comparePrice && (
            <span className="text-gray-400 text-xs line-through">
              ${product.comparePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Mock fallback ──────────────────────────────────────────────────────────
const products = [
  {
    _id: '1',
    productName: 'Samsung 65" OLED 4K Smart TV',
    category: 'TV & Audio',
    price: '1,299',
    comparePrice: '1,799',
    images: [
      'https://images.unsplash.com/photo-1593784991251-92ded75ea290?w=200&q=80',
    ],
  },
  {
    _id: '2',
    productName: 'Dyson V15 Detect Cordless Vacuum',
    category: 'Appliances',
    price: '649',
    comparePrice: '749',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&q=80',
    ],
  },
  {
    _id: '3',
    productName: 'Dior Sauvage Elixir 60ml EDT',
    category: 'Fragrance',
    price: '129',
    comparePrice: '165',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&q=80',
    ],
  },
  {
    _id: '4',
    productName: 'LEGO Technic Lamborghini 1:8 Scale',
    category: 'Toys',
    price: '379',
    comparePrice: '449',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&q=80',
    ],
  },
  {
    _id: '5',
    productName: 'GoPro HERO12 Black Action Camera',
    category: 'Cameras',
    price: '349',
    comparePrice: '399',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80',
    ],
  },
  {
    _id: '6',
    productName: 'Apple AirPods Pro 2nd Gen',
    category: 'Electronics',
    price: '249',
    comparePrice: '299',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80',
    ],
  },
  {
    _id: '7',
    productName: 'Sony PlayStation 5 Console',
    category: 'Gaming',
    price: '499',
    comparePrice: '549',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&q=80',
    ],
  },
  {
    _id: '8',
    productName: 'Kindle Paperwhite 16GB',
    category: 'Books & Media',
    price: '139',
    comparePrice: '159',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80',
    ],
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function TrendingRightNow() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <style>{`
        .trending-swiper .swiper-wrapper { align-items: stretch; }
        .trending-swiper .swiper-slide { height: auto; }
      `}</style>

      <section className="container mx-auto px-3 sm:px-4 py-8">
        <div className=" rounded-3xl ">
          {/* ── Header row ── */}
          <div className="flex items-center justify-between mb-5">
            {/* Left — title */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-0.5 h-4 bg-primary rounded-full" />
                <p className="text-primary text-[11px] font-black tracking-[0.15em] uppercase">
                  Handpicked
                </p>
              </div>
              <h2 className="text-accent text-2xl sm:text-3xl font-black leading-tight">
                Trending{' '}
                <span className=" text-gray-700 font-fraunces font-semibold">
                  Right Now
                </span>
              </h2>
            </motion.div>

            {/* Right — nav buttons */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <button
                ref={prevRef}
                className="w-9 h-9 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center
                  text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50
                  transition-all active:scale-90 disabled:opacity-30 cursor-pointer"
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                ref={nextRef}
                className="w-9 h-9 rounded-full bg-[#1a1a2e] flex items-center justify-center
                  text-white hover:bg-secondary transition-all active:scale-90 cursor-pointer"
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* ── Swiper ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              spaceBetween={12}
              slidesPerView={1.3}
              breakpoints={{
                480: { slidesPerView: 1.8, spaceBetween: 12 },
                640: { slidesPerView: 2.2, spaceBetween: 14 },
                768: { slidesPerView: 2.8, spaceBetween: 14 },
                1024: { slidesPerView: 3.5, spaceBetween: 16 },
                1280: { slidesPerView: 4.2, spaceBetween: 16 },
              }}
              className="trending-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <TrendingCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>
    </>
  );
}
