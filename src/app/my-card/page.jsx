'use client';

import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  selectCartItems,
  removeFromCart,
  updateQuantity,
  setBuyNow,
  syncCartToDB,
} from '@/store/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // selected item keys: unique cartItemId for each cart row
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    if (items.length === 0) {
      setSelected(new Set());
      return;
    }

    setSelected((prevSelected) => {
      const itemIds = new Set(items.map((i) => i.cartItemId));
      if (prevSelected.size === 0) {
        return itemIds;
      }

      const nextSelected = new Set(
        [...prevSelected].filter((id) => itemIds.has(id)),
      );

      if (nextSelected.size === prevSelected.size) {
        return prevSelected;
      }

      return nextSelected;
    });
  }, [items]);

  const allSelected = selected.size === items.length && items.length > 0;
  const noneSelected = selected.size === 0;

  const key = (i) => i.cartItemId;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(items.map(key)));
  };

  const toggleOne = (item) => {
    const k = key(item);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const selectedItems = items.filter((i) => selected.has(key(i)));

  const subtotal = useMemo(
    () => selectedItems.reduce((s, i) => s + i.price * i.quantity, 0),
    [selectedItems],
  );

  const totalItems = selectedItems.reduce((s, i) => s + i.quantity, 0);
  const savings = useMemo(
    () =>
      selectedItems.reduce(
        (s, i) => s + ((i.comparePrice ?? i.price) - i.price) * i.quantity,
        0,
      ),
    [selectedItems],
  );

  const handleRemove = (item) => {
    const k = key(item);
    const updatedItems = items.filter((i) => i.cartItemId !== item.cartItemId);

    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(k);
      return n;
    });

    dispatch(removeFromCart({ cartItemId: item.cartItemId }));
    if (userId) {
      dispatch(syncCartToDB({ userId, items: updatedItems }));
    }
  };

  const handleQty = (item, qty) => {
    dispatch(
      updateQuantity({
        cartItemId: item.cartItemId,
        quantity: qty,
      }),
    );
  };

  const handleCheckout = () => {
    if (noneSelected) return;
    // Pass selected items as buyNow-style bulk (checkout page reads orderItems)
    // We store selected keys in sessionStorage so checkout knows
    sessionStorage.setItem('selectedCartKeys', JSON.stringify([...selected]));
    router.push('/checkout');
  };

  // ── Empty state ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-5xl mx-auto mb-6">
            🛒
          </div>
          <h2 className="text-white text-2xl font-semibold mb-2">
            Your cart is empty
          </h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Looks like you haven't added anything yet. Discover products you'll
            love.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm text-white
              bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
              shadow-[0_4px_20px_rgba(56,189,248,0.2)] hover:opacity-90 transition-all"
          >
            Start Shopping
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* ══ LEFT — Cart items ══ */}
          <div>
            {/* Select-all bar */}
            <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5 mb-4">
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <div
                  onClick={toggleAll}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer
                    ${
                      allSelected
                        ? 'bg-sky-500 border-sky-500'
                        : selected.size > 0
                          ? 'bg-sky-500/30 border-sky-400'
                          : 'border-white/20 bg-white/[0.04] group-hover:border-white/40'
                    }`}
                >
                  {allSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {!allSelected && selected.size > 0 && (
                    <div className="w-2 h-0.5 bg-sky-300 rounded-full" />
                  )}
                </div>
                <span className="text-white/70 text-sm font-medium">
                  {allSelected ? 'Deselect all' : 'Select all'}
                </span>
              </label>

              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs">
                  {selected.size} of {items.length} selected
                </span>
                {selected.size > 0 && (
                  <button
                    onClick={() => {
                      const selectedIds = [...selected];
                      const updatedItems = items.filter(
                        (item) => !selected.has(item.cartItemId),
                      );
                      selectedIds.forEach((k) => {
                        dispatch(removeFromCart({ cartItemId: k }));
                      });
                      setSelected(new Set());
                      if (userId) {
                        dispatch(syncCartToDB({ userId, items: updatedItems }));
                      }
                    }}
                    className="text-red-400/70 hover:text-red-400 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove selected
                  </button>
                )}
              </div>
            </div>

            {/* Item cards */}
            <div className="space-y-3">
              {items.map((item) => {
                const isSelected = selected.has(key(item));
                return (
                  <div
                    key={key(item)}
                    className={`relative flex gap-4 rounded-2xl border p-4 transition-all duration-200
                      ${
                        isSelected
                          ? 'bg-white/[0.04] border-sky-400/25 shadow-[0_0_0_1px_rgba(56,189,248,0.08)]'
                          : 'bg-white/[0.02] border-white/[0.07] opacity-60'
                      }`}
                  >
                    {/* Checkbox */}
                    <div className="flex items-start pt-1 shrink-0">
                      <div
                        onClick={() => toggleOne(item)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all
                          ${isSelected ? 'bg-sky-500 border-sky-500' : 'border-white/20 bg-white/[0.04] hover:border-white/40'}`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Product image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.08] shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl text-white/20">
                          📦
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-white text-sm font-semibold truncate">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {item.color && (
                              <span className="flex items-center gap-1 text-[11px] text-white/40">
                                <span
                                  className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                                  style={{ backgroundColor: item.color }}
                                />
                                {item.color}
                              </span>
                            )}
                            {item.color && item.size && (
                              <span className="text-white/20 text-[11px]">
                                ·
                              </span>
                            )}
                            {item.size && (
                              <span className="text-[11px] text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-md">
                                {item.size}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete btn */}
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-white/20 hover:text-red-400 transition-colors shrink-0 p-1 rounded-lg hover:bg-red-400/10"
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
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Price + Qty row */}
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-white font-bold text-base">
                            ৳{item.price.toLocaleString()}
                          </span>
                          {item.comparePrice &&
                            item.comparePrice > item.price && (
                              <span className="text-white/30 text-xs line-through ml-2">
                                ৳{item.comparePrice.toLocaleString()}
                              </span>
                            )}
                        </div>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-0 bg-white/[0.06] border border-white/10 rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleQty(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-lg font-light"
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-white text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQty(item, item.quantity + 1)}
                            disabled={item.quantity >= (item.stock ?? 99)}
                            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-lg font-light"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Per-item total */}
                      {item.quantity > 1 && (
                        <p className="text-white/30 text-[11px] mt-1.5">
                          Subtotal:{' '}
                          <span className="text-white/50 font-medium">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </p>
                      )}

                      {/* Low stock warning */}
                      {item.stock && item.stock <= 5 && (
                        <p className="text-amber-400/80 text-[11px] mt-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
                          Only {item.stock} left
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue shopping */}
            <div className="mt-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors text-sm w-fit"
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
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Continue shopping
              </Link>
            </div>
          </div>

          {/* ══ RIGHT — Order summary ══ */}
          <div className="lg:sticky lg:top-[72px]">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/[0.07]">
                <h2 className="text-white font-semibold text-sm">
                  Order Summary
                </h2>
              </div>

              <div className="p-5 space-y-4">
                {/* Selected items preview */}
                {selectedItems.length > 0 ? (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div
                        key={key(item)}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/[0.05] shrink-0 border border-white/[0.07]">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">
                              📦
                            </div>
                          )}
                        </div>
                        <span className="text-white/60 text-xs flex-1 truncate">
                          {item.name}
                          <span className="text-white/30">
                            {' '}
                            × {item.quantity}
                          </span>
                        </span>
                        <span className="text-white/80 text-xs font-semibold shrink-0">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-white/25 text-sm">No items selected</p>
                    <p className="text-white/15 text-xs mt-1">
                      Select items above to see the total
                    </p>
                  </div>
                )}

                {selectedItems.length > 0 && (
                  <>
                    <div className="h-px bg-white/[0.07]" />

                    {/* Price breakdown */}
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/45">
                          Subtotal
                          <span className="text-white/25 text-xs ml-1">
                            ({totalItems} item{totalItems !== 1 ? 's' : ''})
                          </span>
                        </span>
                        <span className="text-white/70">
                          ৳{subtotal.toLocaleString()}
                        </span>
                      </div>

                      {savings > 0 && (
                        <div className="flex justify-between">
                          <span className="text-emerald-400/80">You save</span>
                          <span className="text-emerald-400 font-medium">
                            -৳{savings.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-white/45">Shipping</span>
                        <span className="text-white/45 text-xs italic">
                          Calculated at checkout
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-white/[0.07]" />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">
                        Estimated Total
                      </span>
                      <div className="text-right">
                        <div className="text-white font-bold text-xl">
                          ৳{subtotal.toLocaleString()}
                        </div>
                        {savings > 0 && (
                          <div className="text-emerald-400 text-[11px]">
                            Saving ৳{savings.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={noneSelected}
                  className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2
                    bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
                    shadow-[0_4px_20px_rgba(56,189,248,0.2)]
                    hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0
                    disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0
                    transition-all"
                >
                  {noneSelected ? (
                    'Select items to checkout'
                  ) : (
                    <>
                      Checkout ({selected.size} item
                      {selected.size !== 1 ? 's' : ''})
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
                    </>
                  )}
                </button>

                {/* Trust row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { icon: '🔒', label: 'Secure' },
                    { icon: '↩️', label: 'Returns' },
                    { icon: '🚚', label: 'Fast Ship' },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="flex flex-col items-center gap-1 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="text-white/30 text-[10px] font-medium">
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo note */}
            <div className="mt-3 flex items-center gap-2.5 bg-emerald-500/[0.07] border border-emerald-500/20 rounded-xl px-4 py-3">
              <span className="text-lg shrink-0">🎁</span>
              <p className="text-emerald-400/80 text-xs leading-relaxed">
                Use code{' '}
                <span className="font-bold text-emerald-400">SAVE10</span> at
                checkout for 10% off your order!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
