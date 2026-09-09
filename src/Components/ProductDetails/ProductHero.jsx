'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import CartButtons from '../CartButton/CartButtons';
import BuyNowButton from '../CartButton/BuyNowButton';

function StarIcon({ filled, half }) {
  return (
    <svg
      className={`w-4 h-4 ${filled || half ? 'text-amber-400' : 'text-gray-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function StarRating({ rating, size = 'sm' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= Math.floor(rating)}
          half={star === Math.ceil(rating) && rating % 1 !== 0}
        />
      ))}
    </div>
  );
}

const ratingBreakdown = { 5: 184, 4: 63, 3: 29, 2: 7, 1: 2 };
const totalReviews = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);
const avgRating = (
  Object.entries(ratingBreakdown).reduce(
    (sum, [star, count]) => sum + Number(star) * count,
    0,
  ) / totalReviews
).toFixed(1);

export default function ProductHero({ data }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(data.colors[0]);
  const [selectedSize, setSelectedSize] = useState(data.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const product = data;

  const colorNames = {
    '#d4a574': 'Warm Sand',
    '#14b8a6': 'Teal',
    '#f43f5e': 'Rose',
    '#64748b': 'Slate',
    '#f4a261': 'Amber',
    '#2d6a4f': 'Forest',
  };
  const discount = Math.round(
    ((product.comparePrice - product.price) / product.comparePrice) * 100,
  );

  const images =
    product?.images?.length > 0
      ? product.images
      : [
          'https://res.cloudinary.com/dzfrakxek/image/upload/v1779854366/image-not-available_i7kvke.png',
        ];

  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* ── Thumbnails List (Desktop e vertical, Mobile e horizontal) ── */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[500px] no-scrollbar">
            {images.map((image, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all bg-gray-50 shrink-0 ${
                  activeImage === i
                    ? 'border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* ── Main Image View Area ── */}
          <div className="relative flex-1">
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 bg-white flex items-center justify-center">
              <Image
                src={images[activeImage]}
                alt={`Product view ${activeImage + 1}`}
                width={600}
                height={600}
                loading="eager"
                priority
                className="object-contain w-full h-full p-6 transition-transform duration-300 hover:scale-105"
              />

              {/* Badges (Featured & Discount) */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product?.isFeatured && (
                  <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                    Featured
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    -{discount}% Off
                  </span>
                )}
              </div>

              {/* Stock warning banner */}
              {/* {Number(product?.stock) <= 100 && Number(product?.stock) > 0 && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">
                    Only {product.stock} left in stock — order soon!
                  </span>
                </div>
              )} */}
            </div>

            {/* Navigation arrows (Show only if multiple images exist) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage(
                      (p) => (p - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all text-gray-700 hover:text-black backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveImage((p) => (p + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all text-gray-700 hover:text-black backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          {/* Brand + Category */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#e8b86d]">
              {product.brand}
            </span>
            <span className="w-px h-4 bg-gray-300" />
            <span className="text-xs font-medium tracking-wide uppercase text-gray-400 capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-['Fraunces'] font-semibold text-[#1a1a2e] leading-tight mb-2">
              {product.productName}
            </h1>
            <p className="text-gray-500 text-base">
              {product.shortDescription}
            </p>
          </div>

          {/* Rating summary */}
          <div className="flex items-center gap-3">
            <StarRating rating={parseFloat(avgRating)} />
            <span className="text-sm font-semibold text-gray-800">
              {avgRating}
            </span>
            <span className="text-sm text-gray-400">
              ({totalReviews} reviews)
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="text-sm text-emerald-600 font-medium">
              5K+ Sold
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-[#1a1a2e] font-['Fraunces']">
              ৳{Number(product.price).toLocaleString()}
            </span>
            <span className="text-xl text-gray-400 line-through mb-1">
              ৳{Number(product?.comparePrice).toLocaleString()}
            </span>
            {product?.price < product?.comparePrice && (
              <span className="mb-1 bg-rose-100 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full">
                Save ৳{' '}
                {(
                  Number(product.comparePrice) - Number(product.price)
                ).toLocaleString()}
              </span>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Color Picker */}
          {product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  Color:{' '}
                  <span className="font-normal text-gray-500">
                    {colorNames[selectedColor]}
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    title={colorNames[c]}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ring-1 ring-block  ${selectedColor === c ? 'border-[#1a1a2e] ring-2 ring-offset-2 ring-[#1a1a2e]' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Picker */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  Size:{' '}
                  <span className="font-normal text-gray-500">
                    {selectedSize}
                  </span>
                </span>
                <button className="text-xs text-[#1a1a2e] underline underline-offset-2 hover:opacity-70 transition-opacity">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] h-10 px-3 rounded-lg text-sm font-semibold border-2 transition-all ${selectedSize === s ? 'bg-[#1a1a2e] border-[#1a1a2e] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="flex items-center gap-3">
            {/* Qty stepper */}
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(Number(product.stock), q + 1))
                }
                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-105 ${wishlisted ? 'bg-rose-50 border-rose-300 text-rose-500' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}
            >
              <svg
                className="w-5 h-5"
                fill={wishlisted ? 'currentColor' : 'none'}
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

          <div className="flex gap-3 w-full">
            {/* Buy Now */}
            <div className="flex-1">
              <BuyNowButton
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
              />
            </div>
            {/* Add to cart */}
            <div className="flex-1">
              <CartButtons
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                buttonColor={'red'}
              />
            </div>
          </div>
          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: '🚚', label: 'Free Shipping', sub: 'On orders $99+' },
              { icon: '↩️', label: 'Free Returns', sub: '30-day policy' },
              { icon: '🔒', label: 'Secure Pay', sub: 'SSL encrypted' },
            ].map((b) => (
              <div
                key={b.label}
                className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm"
              >
                <div className="text-xl mb-1">{b.icon}</div>
                <div className="text-xs font-semibold text-gray-800">
                  {b.label}
                </div>
                <div className="text-[10px] text-gray-400">{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              Share:
            </span>
            {['Twitter/X', 'Facebook', 'Link'].map((platform) => (
              <button
                key={platform}
                className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
