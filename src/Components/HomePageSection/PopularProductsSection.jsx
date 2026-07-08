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
import { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePopularProducts } from '@/hooks/useProducts';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../ProductCard/ProductCard';

// ─── Product Data ──────────────────────────────────────────────────────────────
const popularProducts = [
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
      <span className="text-xs text-gray-400">({count?.toLocaleString()})</span>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Image */}
      <div className="relative">
        <div className="skeleton h-48 w-full"></div>

        {/* Discount */}
        <div className="absolute top-3 left-3 skeleton h-5 w-12 rounded"></div>

        {/* Wishlist */}
        <div className="absolute top-3 right-3 skeleton h-8 w-8 rounded-full"></div>
      </div>

      <div className="p-4">
        {/* Category */}
        <div className="skeleton h-3 w-20 mb-3"></div>

        {/* Title */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-3/4"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-10"></div>
        </div>

        {/* Price */}
        <div className="flex gap-3 mt-4">
          <div className="skeleton h-6 w-20"></div>
          <div className="skeleton h-5 w-16"></div>
        </div>

        {/* Stock */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <div className="skeleton h-3 w-20"></div>
            <div className="skeleton h-3 w-10"></div>
          </div>

          <div className="skeleton h-2 w-full rounded-full"></div>
        </div>

        {/* Button */}
        <div className="skeleton h-10 w-full rounded-lg mt-5"></div>
      </div>
    </div>
  );
}

// ─── Main Popular Products Section ───────────────────────────────────────────
export default function PopularProductsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [isHovered, setIsHovered] = useState(false);
  const {
    data,
    isPending,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularProducts(activeTab);

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) ?? [];
  }, [data]);

  const tabs = ['all', 'electronics', 'fashion', 'sports', 'home', 'beauty'];

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-0.5 h-4 bg-primary rounded-full" />
            <p className="text-primary text-[11px] font-black tracking-[0.15em] uppercase">
              Customer Favorites
            </p>
          </div>
          <h2 className="text-accent text-2xl sm:text-3xl font-black leading-tight">
            Popular{' '}
            <span className=" text-gray-700 font-fraunces font-semibold">
              Products
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

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border first-letter:uppercase ${
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
      {isLoading || isPending ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          No products found in this category.
        </div>
      )}

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <motion.button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.22,
              ease: 'easeOut',
            }}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="group relative overflow-hidden rounded-full border border-gray-300 bg-white px-8 py-3.5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Shine */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute -left-20 top-0 h-full w-10 rotate-12 bg-white/50 blur-md transition-all duration-700 group-hover:left-[120%]" />
            </span>

            <span className="relative flex items-center gap-2 text-sm font-medium text-gray-800">
              {isFetchingNextPage ? 'Loading...' : 'Load More Products'}
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <ChevronRight
                  size={17}
                  className="text-gray-500 group-hover:text-primary transition-colors duration-300"
                />
              </motion.span>
            </span>
          </motion.button>
        </div>
      )}
    </section>
  );
}
