'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { clearCart, clearBuyNow, selectBuyNowItem } from '@/store/cartSlice';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when you receive',
    icon: '💵',
    color: 'emerald',
  },
  {
    id: 'bkash',
    label: 'bKash',
    sub: 'Mobile banking payment',
    icon: '📱',
    color: 'pink',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    sub: 'Digital financial service',
    icon: '🟠',
    color: 'orange',
  },
  {
    id: 'card',
    label: 'Debit / Credit Card',
    sub: 'Visa, Mastercard',
    icon: '💳',
    color: 'sky',
  },
];

export default function PaymentPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const buyNow = useSelector(selectBuyNowItem);

  const [orderData, setOrderData] = useState(null);
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [mobileNum, setMobileNum] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderData');
    if (!stored) {
      router.push('/checkout');
      return;
    }
    setOrderData(JSON.parse(stored));
  }, [router]);

  const formatCard = (val) =>
    val
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  const formatExpiry = (val) =>
    val
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/^(.{2})(.+)/, '$1/$2');

  const placeOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        ...orderData,
        paymentMethod: method,
        paymentDetails:
          method === 'card'
            ? { last4: cardData.number.replace(/\s/g, '').slice(-4) }
            : method !== 'cod'
              ? { mobileNumber: mobileNum }
              : {},
        status: method === 'cod' ? 'pending' : 'processing',
        createdAt: new Date().toISOString(),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Order failed');
      const { orderId } = await res.json();

      // Clear cart/buyNow
      if (buyNow) dispatch(clearBuyNow());
      else dispatch(clearCart());
      sessionStorage.removeItem('orderData');

      router.push(`/checkout/success/${orderId}`);
    } catch (err) {
      alert('Order placement failed. Please try again.');
    } finally {
      setLoading(false);
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

        {(method === 'bkash' || method === 'nagad') && (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-white font-semibold text-sm mb-4">
              {method === 'bkash' ? 'bKash' : 'Nagad'} Payment Details
            </h3>
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 mb-4 text-center">
              <p className="text-white/40 text-xs mb-1">
                Send money to this number
              </p>
              <p className="text-white font-bold text-xl tracking-widest">
                {method === 'bkash' ? '01XXXXXXXXX' : '01XXXXXXXXX'}
              </p>
              <p className="text-white/30 text-xs mt-1">
                ({method === 'bkash' ? 'bKash' : 'Nagad'} Merchant)
              </p>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                Your {method === 'bkash' ? 'bKash' : 'Nagad'} Number
              </label>
              <input
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50"
              />
              <p className="text-white/30 text-xs mt-2">
                Enter the number you used for the payment
              </p>
            </div>
          </div>
        )}

        {method === 'card' && (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-white font-semibold text-sm mb-5">
              Card Details
            </h3>

            {/* Card preview */}
            <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 p-5 mb-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/[0.08] -translate-y-12 translate-x-12" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/[0.06] translate-y-10 -translate-x-6" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-white/60 text-xs font-medium tracking-widest uppercase">
                    Debit / Credit
                  </div>
                  <svg
                    className="w-10 h-7 text-white/80"
                    viewBox="0 0 40 28"
                    fill="none"
                  >
                    <circle
                      cx="15"
                      cy="14"
                      r="10"
                      fill="currentColor"
                      fillOpacity="0.7"
                    />
                    <circle
                      cx="25"
                      cy="14"
                      r="10"
                      fill="currentColor"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-mono text-lg tracking-[0.2em] mb-3">
                    {cardData.number || '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-widest">
                        Card Holder
                      </p>
                      <p className="text-white text-sm font-medium">
                        {cardData.name || 'YOUR NAME'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-[9px] uppercase tracking-widest">
                        Expires
                      </p>
                      <p className="text-white text-sm font-medium">
                        {cardData.expiry || 'MM/YY'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Card Number
                </label>
                <input
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData((p) => ({
                      ...p,
                      number: formatCard(e.target.value),
                    }))
                  }
                  placeholder="0000 0000 0000 0000"
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50 font-mono tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Cardholder Name
                </label>
                <input
                  value={cardData.name}
                  onChange={(e) =>
                    setCardData((p) => ({
                      ...p,
                      name: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="AS ON CARD"
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50 uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                    Expiry
                  </label>
                  <input
                    value={cardData.expiry}
                    onChange={(e) =>
                      setCardData((p) => ({
                        ...p,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    placeholder="MM/YY"
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                    CVV
                  </label>
                  <input
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData((p) => ({
                        ...p,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                      }))
                    }
                    placeholder="•••"
                    type="password"
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50 font-mono"
                  />
                </div>
              </div>
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
