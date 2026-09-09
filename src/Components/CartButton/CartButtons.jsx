'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
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
  buttonColor = 'gray',
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const cartItems = useSelector(selectCartItems);
  const pathname = usePathname();

  console.log(buttonColor);

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
    if (!session?.user?.id) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

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

  return (
    <div className="flex gap-3">
      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`relative z-20  flex items-center justify-center gap-2 text-sm font-semibold  cursor-pointer  transition-all hover:gap-3 active:scale-95 px-6 py-3 rounded-xl w-full 
          ${
            buttonColor === 'gray'
              ? addedFeedback
                ? 'bg-secondary text-white'
                : 'bg-accent/95 hover:bg-accent text-white'
              : addedFeedback
                ? ' bg-primary text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
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
    </div>
  );
}
