'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  addToCart,
  setBuyNow,
  syncCartToDB,
  selectCartItems,
} from '@/store/cartSlice';

/**
 * Props:
 *   product  — full product object from MongoDB
 *   selectedColor — currently selected color
 *   selectedSize  — currently selected size
 *   quantity      — quantity (default 1)
 */
export default function CartButtons({
  product,
  selectedColor,
  selectedSize,
  quantity = 1,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const cartItems = useSelector(selectCartItems);

  const [addedFeedback, setAddedFeedback] = useState(false);

  const generateItemId = (cartItems) => {
    for (let i = 1; ; i++) {
      const itemId = `EB-${i}`;

      const exists = cartItems.some((item) => item.cartItemId === itemId);

      if (!exists) {
        return itemId;
      }
    }
  };
  const itemId = generateItemId(cartItems);

  const itemPayload = {
    productId: product._id?.toString(),
    cartItemId: itemId,
    name: product.productName,
    price: Number(product.price),
    image: product.images?.[0] || null,
    color: selectedColor,
    size: selectedSize,
    stock: Number(product.stock),
    quantity,
  };

  // ── Add to Cart ──
  const handleAddToCart = async () => {
    dispatch(addToCart(itemPayload));

    // MongoDB sync (logged-in user only)
    if (session?.user?.id) {
      const updatedItems = [...cartItems];
      updatedItems.push(itemPayload);
      dispatch(syncCartToDB({ userId: session.user.id, items: updatedItems }));
    }

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // ── Buy Now ──
  const handleBuyNow = () => {
    dispatch(setBuyNow(itemPayload));
    router.push('/checkout');
  };

  return (
    <div className="flex gap-3">
      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`flex-1 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all 
          ${
            addedFeedback
              ? 'bg-emerald-500 text-white'
              : 'bg-emerald-900 border border-white/15 hover:bg-emerald-700 hover:border-white/25 active:scale-95'
          }`}
      >
        {addedFeedback ? (
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
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </>
        )}
      </button>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        className="flex-1 h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2
          bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
          shadow-[0_4px_16px_rgba(56,189,248,0.2)]
          hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all"
      >
        Buy Now
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
      </button>
    </div>
  );
}
