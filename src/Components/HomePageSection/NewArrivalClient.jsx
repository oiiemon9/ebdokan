'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

// ── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ rating = 4.5, count = 0 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const half =
            !filled && star === Math.ceil(rating) && rating % 1 !== 0;
          return (
            <svg
              key={star}
              className={`w-3 h-3 ${filled || half ? 'text-amber-400' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
      <span className="text-gray-400 text-[11px]">({count})</span>
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const dispatch = useDispatch();
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.comparePrice
    ? Math.round(
        ((Number(product.comparePrice.toString().replace(/,/g, '')) -
          Number(product.price.toString().replace(/,/g, ''))) /
          Number(product.comparePrice.toString().replace(/,/g, ''))) *
          100,
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <Link
        href={`/products/${product._id}`}
        className="absolute inset-0 z-10"
      />
      {/* Image container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-200">
            📦
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div
            className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black
              px-2 py-1 rounded-lg tracking-wide"
          >
            -{discount}%
          </div>
        )}

        {/* New badge */}
        {product.isNew && (
          <div
            className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black
              px-2 py-1 rounded-lg tracking-wide"
            style={{ left: discount ? '52px' : '12px' }}
          >
            NEW
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWish((w) => !w);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
              border transition-all duration-200 z-20
              ${
                wish
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-white/90 border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
              }`}
        >
          <svg
            className="w-4 h-4"
            fill={wish ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Category */}
        <p className="text-secondary text-[10px] font-black tracking-widest uppercase mb-1">
          {product.category}
        </p>

        {/* Product name */}
        <h3 className=" group-hover:text-green-600 text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem] transition-all duration-300">
          {product.productName}
        </h3>

        {/* Stars */}
        <div className="mb-3">
          <StarRating
            rating={product.rating || 4.5}
            count={product.reviewCount || 12}
          />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-900 font-black text-base">
            ৳{product.price}
          </span>
          {product.comparePrice && (
            <span className="text-gray-400 text-sm line-through">
              ৳{product.comparePrice}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className={`w-full h-10 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2
              transition-all active:scale-95 relative z-20
              ${added ? 'bg-emerald-500' : 'bg-[#1a1a2e] hover:bg-[#2d2d4e]'}`}
        >
          {added ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ── Left promo card ────────────────────────────────────────────────────────
function PromoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden  h-full"
      style={{
        background:
          'linear-gradient(160deg, #f97316 0%, #ea580c 35%, #c2410c 70%, #7c2d12 100%)',
      }}
    >
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=85"
          alt="New Arrivals Model"
          fill
          className="object-cover object-center opacity-60 mix-blend-luminosity"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Dot decoration */}
      <div className="absolute top-6 right-6 grid grid-cols-4 gap-1.5 opacity-30">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
        <div
          className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm
          border border-white/20 rounded-full px-3 py-1 mb-4"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/90 text-[10px] font-bold tracking-widest uppercase">
            Just Dropped
          </span>
        </div>

        <h2 className="text-white font-black text-3xl sm:text-4xl leading-tight mb-3">
          New{' '}
          <em
            className="not-italic italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Arrivals
          </em>
        </h2>

        <p className="text-white/65 text-sm leading-relaxed mb-6">
          Discover the latest trends and exclusive premium collections just
          landed.
        </p>

        <Link
          href="/new-arrivals"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700
            text-white font-bold text-sm px-6 py-3 rounded-xl w-full justify-center
            transition-all hover:gap-3 active:scale-95"
        >
          Shop Now
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main client component ──────────────────────────────────────────────────
export default function NewArrivalClient({ products = [] }) {
  const visibleProducts = Array.isArray(products) ? products : [];

  return (
    <section className="container mx-auto px-3 sm:px-4 py-8">
      {/* Section header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-0.5 h-4 bg-primary rounded-full" />
            <p className="text-primary text-[11px] font-black tracking-[0.15em] uppercase">
              Just Dropped
            </p>
          </div>
          <h2 className="text-accent text-2xl sm:text-3xl font-black leading-tight">
            New{' '}
            <span className=" text-gray-700 font-fraunces font-semibold">
              Arrivals
            </span>
          </h2>
        </div>

        <Link
          href="/new-arrivals"
          className="inline-flex items-center gap-2 bg-secondary/95 hover:bg-secondary
            text-white font-bold text-sm px-6 py-3 rounded-xl w-36 justify-center
            transition-all hover:gap-3 active:scale-95"
        >
          View All
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Grid layout — mirrors the reference image exactly */}
      {/* 
        Layout:
        [Promo Card (tall)] | [Product] [Product] [Product]
        [Promo Card (tall)] | [Product] [Product] [Product]
      */}
      <div className="grid  grid-rows-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Left promo card — spans 2 rows on lg */}
        <div className=" col-span-2 md:row-span-2">
          <PromoCard />
        </div>

        {/* 6 product cards — 3 per row on lg */}
        {visibleProducts.length > 0 ? (
          visibleProducts.slice(0, 6).map((product, i) => (
            <div key={product._id} className="col-span-1">
              <ProductCard product={product} index={i} />
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No new arrivals available right now.
          </div>
        )}
      </div>
    </section>
  );
}
