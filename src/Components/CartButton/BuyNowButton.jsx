import { selectCartItems, setBuyNow } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function BuyNowButton({
  product,
  selectedColor,
  selectedSize,
  quantity = 1,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const router = useRouter();
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
  const handleBuyNow = () => {
    // If the user wants direct buy now, clear any previous cart selection.
    sessionStorage.removeItem('selectedCartKeys');
    dispatch(setBuyNow(itemPayload));
    router.push('/checkout');
  };
  return (
    <button
      onClick={handleBuyNow}
      className="inline-flex items-center gap-2 bg-secondary/95 hover:bg-secondary
            text-white font-bold text-sm px-6 py-3 rounded-xl w-full justify-center
            transition-all hover:gap-3 active:scale-95 cursor-pointer"
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
  );
}
