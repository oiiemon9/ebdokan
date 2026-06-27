'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  clearCart,
  clearBuyNow,
  removeMultipleFromCart,
  selectBuyNowItem,
} from '@/store/cartSlice';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when you receive',
    icon: '💵',
    color: 'emerald',
  },
  {
    id: 'sslpay',
    label: 'Online Payment',
    sub: 'Mobile banking payment (bkash, Nagad, Visa, Mastercard and Etc.)',
    icon: '📱',
    color: 'pink',
  },
];

export default function PaymentPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const buyNow = useSelector(selectBuyNowItem);

  const [orderData, setOrderData] = useState(null);
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('orderData');
    if (!stored) {
      router.push('/checkout');
      return;
    }
    setOrderData(JSON.parse(stored));
  }, [router]);

  const placeOrder = async () => {
    if (method === 'sslpay') {
      setLoading(true);

      try {
        const res = await fetch('/api/payment/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderData }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  if (!orderData)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    );

  const { items, subtotal, shippingCost, discount, total, shippingInfo } =
    orderData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* ══ LEFT — Payment method ══ */}
      <div className="space-y-5">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h2 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">
              1
            </span>
            Choose Payment Method
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setMethod(pm.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all
                  ${
                    method === pm.id
                      ? 'border-sky-400/50 bg-sky-400/[0.07]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                  }`}
              >
                <span className="text-2xl">{pm.icon}</span>
                <div>
                  <p className="text-white text-sm font-medium">{pm.label}</p>
                  <p className="text-white/35 text-[11px]">{pm.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Payment details based on method ── */}
        {method === 'cod' && (
          <div className="bg-emerald-500/[0.07] border border-emerald-500/20 rounded-2xl p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-xl shrink-0">
              💵
            </div>
            <div>
              <p className="text-emerald-400 font-semibold text-sm mb-1">
                Cash on Delivery Selected
              </p>
              <p className="text-white/45 text-xs leading-relaxed">
                Pay ৳{total?.toLocaleString()} in cash when your order arrives.
                Our delivery agent will collect the payment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ══ RIGHT — Order summary ══ */}
      <div className="space-y-4">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 sticky top-6">
          <h2 className="text-white font-semibold text-sm mb-4">
            Order Summary
          </h2>

          {/* Shipping info */}
          <div className="bg-white/[0.03] rounded-xl p-3 mb-4">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">
              Delivering to
            </p>
            <p className="text-white text-sm font-medium">
              {shippingInfo?.name}
            </p>
            <p className="text-white/45 text-xs mt-0.5">
              {shippingInfo?.phone}
            </p>
            <p className="text-white/45 text-xs">
              {shippingInfo?.address}, {shippingInfo?.city}
            </p>
          </div>

          {/* Items */}
          <div className="space-y-2.5 mb-4 max-h-52 overflow-y-auto">
            {items?.map((item, i) => (
              <div key={i} className="flex gap-2.5 items-center">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.05] shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm">
                      📦
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-white/35 text-[11px]">× {item.quantity}</p>
                </div>
                <p className="text-white text-xs font-semibold">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/[0.07] mb-3" />

          <div className="space-y-2 mb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-white/45">Subtotal</span>
              <span className="text-white/70">
                ৳{subtotal?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Shipping</span>
              <span
                className={
                  shippingCost === 0 ? 'text-emerald-400' : 'text-white/70'
                }
              >
                {shippingCost === 0 ? 'FREE' : `৳${shippingCost}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-white/45">Discount</span>
                <span className="text-emerald-400">-৳{discount}</span>
              </div>
            )}
            <div className="h-px bg-white/[0.07]" />
            <div className="flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-white text-base">
                ৳{total?.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2
              bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
              shadow-[0_4px_20px_rgba(56,189,248,0.2)]
              hover:opacity-90 hover:-translate-y-0.5 transition-all active:translate-y-0
              disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Placing order…
              </>
            ) : (
              <>
                {method === 'cod' ? '📦 Place Order' : '🔒 Pay Now'}
                <span className="text-white/70">
                  · ৳{total?.toLocaleString()}
                </span>
              </>
            )}
          </button>

          <p className="text-center text-white/20 text-[10px] mt-2">
            By placing your order you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
