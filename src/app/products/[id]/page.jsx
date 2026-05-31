'use client';

import React, { useState } from 'react';

const product = {
  productName: 'Imelda Bauer',
  shortDescription: 'Molestiae laudantium ',
  description:
    '<p>Aut necessitatibus d. A premium quality product crafted with exceptional materials and attention to detail. This item combines functionality with sophisticated design to deliver an unparalleled experience for discerning customers.</p>',
  category: 'books',
  subCategory: 'Non nulla neque sunt',
  brand: 'Culpa voluptate omn',
  price: '640',
  comparePrice: '500',
  discountPercentage: 22,
  costPerItem: '87',
  stock: '4',
  sku: 'Dolore aliquid accus',
  barcode: 'Saepe distinctio Su',
  weight: '88',
  weightUnit: 'oz',
  status: 'active',
  colors: ['#d4a574', '#14b8a6', '#f43f5e', '#64748b', '#f4a261', '#2d6a4f'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  tags: ['premium', 'bestseller', 'new-arrival'],
  images: [],
  isFeatured: true,
};

const colorNames = {
  '#d4a574': 'Warm Sand',
  '#14b8a6': 'Teal',
  '#f43f5e': 'Rose',
  '#64748b': 'Slate',
  '#f4a261': 'Amber',
  '#2d6a4f': 'Forest',
};

const reviews = [
  {
    id: 1,
    name: 'James Gouse',
    avatar: 'JG',
    rating: 5,
    date: 'May 20, 2026',
    comment:
      "Exceptional quality and the finish is absolutely stunning. Worth every penny — I've been using it daily and it's held up perfectly.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    name: 'Guy Hawkins',
    avatar: 'GH',
    rating: 4,
    date: 'May 15, 2026',
    comment:
      'Great product overall. The color is exactly as shown. Fit is generous, which I actually prefer for a relaxed look.',
    helpful: 7,
    verified: true,
  },
  {
    id: 3,
    name: 'Sarah Lin',
    avatar: 'SL',
    rating: 5,
    date: 'May 10, 2026',
    comment:
      'Absolutely love it! The material feels luxurious and the craftsmanship is evident. Would definitely buy again.',
    helpful: 19,
    verified: true,
  },
  {
    id: 4,
    name: 'Marcus Reid',
    avatar: 'MR',
    rating: 3,
    date: 'Apr 28, 2026',
    comment:
      "Good product but shipping took longer than expected. Quality is decent, though I've seen better for the price.",
    helpful: 4,
    verified: false,
  },
  {
    id: 5,
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    date: 'Apr 20, 2026',
    comment:
      'Perfect in every way! The design is so unique and it pairs well with everything in my wardrobe.',
    helpful: 23,
    verified: true,
  },
];

const ratingBreakdown = { 5: 184, 4: 63, 3: 29, 2: 7, 1: 2 };
const totalReviews = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);
const avgRating = (
  Object.entries(ratingBreakdown).reduce(
    (sum, [star, count]) => sum + Number(star) * count,
    0,
  ) / totalReviews
).toFixed(1);

const relatedProducts = [
  {
    id: 1,
    name: 'Cassidy Atlas',
    price: 480,
    comparePrice: 600,
    rating: 4.7,
    reviews: 143,
    color: '#14b8a6',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Lennox Forte',
    price: 390,
    comparePrice: null,
    rating: 4.5,
    reviews: 98,
    color: '#f43f5e',
    badge: 'Sale',
  },
  {
    id: 3,
    name: 'Orion Vault',
    price: 720,
    comparePrice: 900,
    rating: 4.9,
    reviews: 207,
    color: '#2d6a4f',
    badge: 'Featured',
  },
  {
    id: 4,
    name: 'Sylva Dune',
    price: 310,
    comparePrice: null,
    rating: 4.3,
    reviews: 56,
    color: '#d4a574',
    badge: null,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

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

function ImagePlaceholder({ color, index }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
      }}
    >
      <div className="text-center opacity-40">
        <svg
          className="w-16 h-16 mx-auto mb-2"
          style={{ color }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
          <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
        </svg>
        <span className="text-xs font-medium" style={{ color }}>
          Product Image {index + 1}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function Page() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviewSort, setReviewSort] = useState('latest');

  const discount = Math.round(
    ((product.comparePrice - product.price) / product.comparePrice) * 100,
  );

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSort === 'highest') return b.rating - a.rating;
    if (reviewSort === 'lowest') return a.rating - b.rating;
    if (reviewSort === 'helpful') return b.helpful - a.helpful;
    return b.id - a.id;
  });

  return (
    <div className="min-h-screen  font-['DM_Sans',sans-serif]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,400&display=swap');
        :root { --accent: #1a1a2e; --accent2: #e8b86d; }
        .tab-active { border-bottom: 2px solid #1a1a2e; color: #1a1a2e; font-weight: 600; }
        .thumb-active { border: 2px solid #1a1a2e; }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .pop { animation: pop 0.25s ease; }
      `}</style>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide uppercase">
          <span className="hover:text-gray-700 cursor-pointer transition-colors">
            Home
          </span>
          <span>/</span>
          <span className="hover:text-gray-700 cursor-pointer transition-colors capitalize">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-gray-700">{product.productName}</span>
        </nav>
      </div>

      {/* ── Product Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'thumb-active shadow-md' : 'border-transparent opacity-60 hover:opacity-90'}`}
                  style={{
                    background: `${product.colors[i % product.colors.length]}22`,
                  }}
                >
                  <ImagePlaceholder
                    color={product.colors[i % product.colors.length]}
                    index={i}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <div
                className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${selectedColor}18 0%, ${selectedColor}35 100%)`,
                }}
              >
                <ImagePlaceholder color={selectedColor} index={activeImage} />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isFeatured && (
                    <span className="bg-[#1a1a2e] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                      Featured
                    </span>
                  )}
                  <span className="bg-[#e8b86d] text-[#1a1a2e] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    -{discount}% Off
                  </span>
                </div>

                {/* Stock warning */}
                {Number(product.stock) <= 5 && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-800">
                      Only {product.stock} left in stock — order soon!
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setActiveImage((p) => (p - 1 + 5) % 5)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
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
                onClick={() => setActiveImage((p) => (p + 1) % 5)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
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
                ${product.price}
              </span>
              <span className="text-xl text-gray-400 line-through mb-1">
                ${product.comparePrice}
              </span>
              <span className="mb-1 bg-rose-100 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full">
                Save ${Number(product.comparePrice) - Number(product.price)}
              </span>
            </div>

            <hr className="border-gray-200" />

            {/* Color Picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  Color:{' '}
                  <span className="font-normal text-gray-500">
                    {colorNames[selectedColor]}
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    title={colorNames[c]}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === c ? 'border-[#1a1a2e] ring-2 ring-offset-2 ring-[#1a1a2e]' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
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

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 rounded-xl font-semibold text-sm tracking-wide transition-all ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e] active:scale-95'}`}
              >
                {addedToCart ? '✓ Added to Cart!' : '+ Add to Cart'}
              </button>

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

            {/* Buy now */}
            <button className="w-full h-11 rounded-xl border-2 border-[#1a1a2e] text-[#1a1a2e] font-semibold text-sm tracking-wide hover:bg-[#1a1a2e] hover:text-white transition-all active:scale-95">
              Buy Now — Instant Checkout
            </button>

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

      {/* ── Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            {['details', 'reviews', 'discussion'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize tracking-wide transition-colors ${activeTab === tab ? 'tab-active' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'}`}
              >
                {tab === 'reviews'
                  ? `Reviews (${totalReviews})`
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-4">
                Product Description
              </h2>
              <div
                className="text-gray-600 leading-relaxed text-base"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  'Premium Quality Materials',
                  'Handcrafted Precision',
                  'Sustainable Sourcing',
                  'Lifetime Guarantee',
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-[#e8b86d]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Fraunces']">
                Specifications
              </h3>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {[
                  ['SKU', product.sku],
                  ['Barcode', product.barcode],
                  ['Weight', `${product.weight} ${product.weightUnit}`],
                  ['Category', product.category],
                  ['Sub-category', product.subCategory],
                  ['Brand', product.brand],
                  ['Status', product.status],
                  ['Stock', `${product.stock} units`],
                ].map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex justify-between items-start py-3 px-4 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <span className="text-gray-500 font-medium">{label}</span>
                    <span className="text-gray-800 font-semibold text-right max-w-[60%] break-words capitalize">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Rating Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-7xl font-['Fraunces'] font-semibold text-[#1a1a2e]">
                    {avgRating}
                  </div>
                  <div className="flex justify-center mt-2 mb-1">
                    <StarRating rating={parseFloat(avgRating)} />
                  </div>
                  <div className="text-sm text-gray-400">
                    {totalReviews} reviews
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingBreakdown[star];
                    const pct = Math.round((count / totalReviews) * 100);
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-3 text-right">
                          {star}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-amber-400 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="mt-6 w-full h-10 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#2d2d4e] transition-colors">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-['Fraunces'] font-semibold text-[#1a1a2e]">
                  Customer Reviews
                </h3>
                <select
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
                >
                  <option value="latest">Latest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 text-sm">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={review.rating} />
                            <span className="text-xs text-gray-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
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
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        Helpful ({review.helpful})
                      </button>
                      <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors font-medium">
                Load More Reviews
              </button>
            </div>
          </div>
        )}

        {/* Discussion Tab */}
        {activeTab === 'discussion' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-6">
              Community Discussion
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Ask a Question
              </h3>
              <textarea
                placeholder="What would you like to know about this product?"
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] resize-none"
              />
              <button className="mt-3 px-6 py-2.5 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#2d2d4e] transition-colors">
                Post Question
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'Is this suitable for beginners?',
                  a: "Yes, it's designed to be accessible for all skill levels. The included guide makes it easy to get started.",
                  user: 'Alex T.',
                  aUser: 'Store Team',
                },
                {
                  q: 'What is the return policy?',
                  a: "We offer a full 30-day return policy. Just contact support and we'll arrange a free pickup.",
                  user: 'Sam K.',
                  aUser: 'Store Team',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0 mt-0.5">
                      Q
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.q}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Asked by {item.user}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-4 pl-4 border-l-2 border-[#e8b86d]">
                    <div className="w-7 h-7 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      A
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{item.a}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        — {item.aUser}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Related Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e]">
            You Might Also Like
          </h2>
          <button className="text-sm font-medium text-[#1a1a2e] underline underline-offset-2 hover:opacity-70 transition-opacity">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {relatedProducts.map((rp) => (
            <div
              key={rp.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div
                className="aspect-square relative"
                style={{ background: `${rp.color}22` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <svg
                      className="w-12 h-12 mx-auto"
                      style={{ color: rp.color }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        strokeWidth="1.5"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                      <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                {rp.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${rp.badge === 'Sale' ? 'bg-rose-500 text-white' : rp.badge === 'New' ? 'bg-[#e8b86d] text-[#1a1a2e]' : 'bg-[#1a1a2e] text-white'}`}
                  >
                    {rp.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
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
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate group-hover:text-[#1a1a2e] transition-colors">
                  {rp.name}
                </h4>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={rp.rating} />
                  <span className="text-xs text-gray-400">({rp.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1a1a2e]">${rp.price}</span>
                  {rp.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${rp.comparePrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recently Viewed ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-5">
          Recently Viewed
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...relatedProducts].reverse().map((rp) => (
            <div
              key={rp.id}
              className="shrink-0 w-36 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div
                className="w-full h-28"
                style={{ background: `${rp.color}22` }}
              >
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <svg
                    className="w-8 h-8"
                    style={{ color: rp.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth="1.5"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                    <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {rp.name}
                </p>
                <p className="text-xs font-bold text-[#1a1a2e] mt-0.5">
                  ${rp.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sticky Add to Cart (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl lg:hidden z-50">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div>
            <p className="text-xs text-gray-400 font-medium">
              {product.productName}
            </p>
            <p className="text-base font-bold text-[#1a1a2e]">
              ${product.price}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-11 rounded-xl font-semibold text-sm transition-all ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e] active:scale-95'}`}
          >
            {addedToCart ? '✓ Added!' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
