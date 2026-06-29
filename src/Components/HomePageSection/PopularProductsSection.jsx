'use client';
import {
  ChevronRight,
  Headphones,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { useState } from 'react';

// ─── Product Data ──────────────────────────────────────────────────────────────
const popularProducts = [
  {
    id: 1,
    category: 'ELECTRONICS',
    categoryColor: 'text-purple-500',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    rating: 4,
    reviewCount: 1294,
    price: 229.99,
    originalPrice: 349.99,
    discount: 35,
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Hot',
    badgeColor: 'bg-orange-500',
    stockLevel: 15,
    stockLabel: 'Only 12 left!',
    stockLabelColor: 'text-red-500',
    stockBarColor: 'bg-red-500',
    isWishlisted: false,
  },
  {
    id: 2,
    category: 'TABLETS',
    categoryColor: 'text-purple-500',
    name: 'iPad Pro 12.9" M2 Chip with Liquid Retina XDR Display',
    rating: 4,
    reviewCount: 976,
    price: 879.0,
    originalPrice: 1099.0,
    discount: 20,
    image:
      'https://images.pexels.com/photos/18205642/pexels-photo-18205642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 60,
    stockLabel: '23 left',
    stockLabelColor: 'text-orange-500',
    stockBarColor: 'bg-orange-400',
    isWishlisted: false,
  },
  {
    id: 3,
    category: 'FOOTWEAR',
    categoryColor: 'text-purple-500',
    name: 'Nike Air Max 270 React Premium Running Shoes',
    rating: 3.5,
    reviewCount: 2323,
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    image:
      'https://images.pexels.com/photos/24702077/pexels-photo-24702077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Bestseller',
    badgeColor: 'bg-green-500',
    stockLevel: 5,
    stockLabel: 'Selling Fast!',
    stockLabelColor: 'text-red-500',
    stockBarColor: 'bg-red-500',
    isWishlisted: true,
  },
  {
    id: 4,
    category: 'BEAUTY',
    categoryColor: 'text-purple-500',
    name: 'La Mer Moisturizing Crème Advanced Skincare Bundle',
    rating: 4.5,
    reviewCount: 567,
    price: 189.0,
    originalPrice: 252.0,
    discount: 25,
    image:
      'https://images.pexels.com/photos/4841178/pexels-photo-4841178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 80,
    stockLabel: 'In Stock',
    stockLabelColor: 'text-green-500',
    stockBarColor: 'bg-green-500',
    isWishlisted: false,
  },
  {
    id: 5,
    category: 'GAMING',
    categoryColor: 'text-purple-500',
    name: 'Corsair K100 RGB Mechanical Gaming Keyboard Cherry MX',
    rating: 4,
    reviewCount: 1421,
    price: 139.99,
    originalPrice: 199.99,
    discount: 30,
    image:
      'https://images.pexels.com/photos/8219211/pexels-photo-8219211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 20,
    stockLabel: 'Only 7 left!',
    stockLabelColor: 'text-red-500',
    stockBarColor: 'bg-red-500',
    isWishlisted: false,
  },
  {
    id: 6,
    category: 'SPORTS',
    categoryColor: 'text-purple-500',
    name: 'Manduka PRO Yoga Mat 6mm – Premium Non-Slip Performance',
    rating: 4,
    reviewCount: 882,
    price: 84.99,
    originalPrice: 99.99,
    discount: 15,
    image:
      'https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 90,
    stockLabel: 'Plenty left',
    stockLabelColor: 'text-green-500',
    stockBarColor: 'bg-green-500',
    isWishlisted: false,
  },
  {
    id: 7,
    category: 'HOME',
    categoryColor: 'text-purple-500',
    name: "De'Longhi Dinamica Automatic Espresso & Coffee Machine",
    rating: 4.5,
    reviewCount: 1056,
    price: 699.0,
    originalPrice: 899.0,
    discount: 22,
    image:
      'https://images.pexels.com/photos/36573009/pexels-photo-36573009.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 35,
    stockLabel: '18 left',
    stockLabelColor: 'text-orange-500',
    stockBarColor: 'bg-orange-400',
    isWishlisted: false,
  },
  {
    id: 8,
    category: 'FASHION',
    categoryColor: 'text-purple-500',
    name: 'Coach Tabby 26 Leather Shoulder Bag — Limited Edition',
    rating: 4,
    reviewCount: 422,
    price: 348.0,
    originalPrice: 425.0,
    discount: 18,
    image:
      'https://images.pexels.com/photos/27127406/pexels-photo-27127406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: null,
    badgeColor: null,
    stockLevel: 10,
    stockLabel: 'Only 5 left!',
    stockLabelColor: 'text-red-500',
    stockBarColor: 'bg-red-500',
    isWishlisted: false,
  },
];

// ─── Star Rating Component ─────────────────────────────────────────────────────
function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <span key={star} className="relative inline-block">
              <Star size={13} className="text-gray-200" fill="currentColor" />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star
                    size={13}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-xs text-gray-400">({count.toLocaleString()})</span>
    </div>
  );
}

// ─── Product Card Component ───────────────────────────────────────────────────
function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(product.isWishlisted);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Image Area */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Discount & Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{product.discount}%
          </span>
          {product.badge && (
            <span
              className={`${product.badgeColor} text-white text-xs font-semibold px-2 py-0.5 rounded`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            size={16}
            className={wishlisted ? 'text-red-500' : 'text-gray-400'}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span
          className={`text-[10px] font-bold tracking-widest ${product.categoryColor} mb-1`}
        >
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Stars */}
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Stock Level Bar */}
        <div className="mt-3 mb-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400 font-medium">
              Stock Level
            </span>
            <span
              className={`text-[10px] font-semibold ${product.stockLabelColor}`}
            >
              {product.stockLabel}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${product.stockBarColor} transition-all duration-300`}
              style={{ width: `${product.stockLevel}%` }}
            />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
          }`}
        >
          <ShoppingCart size={15} />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Popular Products Section ───────────────────────────────────────────
export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Electronics', 'Fashion', 'Sports', 'Home', 'Beauty'];

  const filtered =
    activeTab === 'All'
      ? popularProducts
      : popularProducts.filter(
          (p) => p.category.toLowerCase() === activeTab.toLowerCase(),
        );

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular{' '}
            <span className="italic font-bold text-gray-700">Products</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Trending picks loved by thousands of shoppers
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-300 hover:border-gray-600 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          View All
          <ChevronRight size={15} />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeTab === tab
                ? 'bg-[#0f172a] text-white border-[#0f172a]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          No products found in this category.
        </div>
      )}

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all duration-200">
          Load More Products
          <ChevronRight size={15} />
        </button>
      </div>
    </section>
  );
}
