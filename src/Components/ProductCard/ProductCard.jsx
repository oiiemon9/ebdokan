import { motion, useMotionValue, useSpring } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

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

// ─── Product Card Component ───────────────────────────────────────────────────
export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(product.isWishlisted);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };
  const imageVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className=" group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg  hover:-translate-y-1 transition-all duration-300"
    >
      <Link
        href={`/products/${product._id}`}
        className="absolute inset-0 z-10"
      />

      <div className=" flex flex-col group">
        {/* Image Area */}
        <div className="relative overflow-hidden bg-gray-50">
          {/* Discount & Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">
              -{product?.discountPercentage}%
            </span>
            {/* {product.badge && (
            <span
              className={`${product.badgeColor} text-white text-xs font-semibold px-2 py-0.5 rounded`}
            >
              {product.badge}
            </span>
          )} */}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            <Heart
              size={16}
              className={wishlisted ? 'text-red-500' : 'text-gray-400'}
              fill={wishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Product Image */}
          <motion.div variants={imageVariants} className="aspect-square">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.productName}
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
            ) : (
              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                No Image
              </div>
            )}
          </motion.div>
        </div>

        {/* Info Area */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <span
            className={`text-[10px] font-bold tracking-widest ${product.categoryColor || 'text-secondary'} mb-1`}
          >
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="group-hover:text-green-600 text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem] transition-all duration-300">
            {product.productName}
          </h3>

          {/* Stars */}
          <StarRating
            // rating={product.rating}
            // count={product.reviewCount}
            rating="4.5"
            count="150"
          />

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900 font-fraunces">
              ${Number(product?.price).toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${Number(product?.comparePrice).toLocaleString()}
            </span>
          </div>

          {/* Stock Level Bar */}
          <div className="mt-3 mb-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 font-medium">
                Stock Level
              </span>
              <span
                className={`text-[10px] font-semibold ${product.stockLabelColor || 'text-green-500'}`}
              >
                {product.stock}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${product.stockBarColor || 'bg-green-500'} transition-all duration-300`}
                style={{ width: `${product.stockLevel || 95}%` }}
              />
            </div>
          </div>

          {/* Add to Cart Button */}

          <button
            onClick={handleAddToCart}
            className={`relative z-20 mt-3  flex items-center justify-center gap-2 text-sm font-semibold  cursor-pointer  transition-all hover:gap-3 active:scale-95 px-6 py-3 rounded-xl w-full ${
              addedToCart
                ? 'bg-secondary text-white'
                : 'bg-accent/95 hover:bg-accent text-white'
            }`}
          >
            <ShoppingCart size={15} />
            {addedToCart ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
