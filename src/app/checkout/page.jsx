'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  selectCartItems,
  selectBuyNowItem,
  selectCartTotal,
} from '@/store/cartSlice';

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    sub: '3–5 business days',
    price: 60,
    icon: '🚚',
  },
  {
    id: 'express',
    label: 'Express Delivery',
    sub: '1–2 business days',
    price: 120,
    icon: '⚡',
  },
  {
    id: 'free',
    label: 'Free Delivery',
    sub: '5–7 business days',
    price: 0,
    icon: '🎁',
  },
];

const DISTRICTS = [
  'Dhaka',
  'Faridpur',
  'Gazipur',
  'Gopalganj',
  'Kishoreganj',
  'Madaripur',
  'Manikganj',
  'Munshiganj',
  'Narayanganj',
  'Narsingdi',
  'Rajbari',
  'Shariatpur',
  'Tangail',
  'Brahmanbaria',
  'Chandpur',
  'Cumilla',
  'Noakhali',
  'Feni',
  'Lakshmipur',
  'Chattogram',
  "Cox's Bazar",
  'Bandarban',
  'Khagrachhari',
  'Rangamati',
  'Sylhet',
  'Habiganj',
  'Moulvibazar',
  'Sunamganj',
  'Rajshahi',
  'Bogura',
  'Chapainawabganj',
  'Naogaon',
  'Natore',
  'Pabna',
  'Sirajganj',
  'Kushtia',
  'Jhenaidah',
  'Magura',
  'Meherpur',
  'Narail',
  'Satkhira',
  'Jashore',
  'Khulna',
  'Bagerhat',
  'Chuadanga',
  'Pirojpur',
  'Barguna',
  'Bhola',
  'Jhalokathi',
  'Patuakhali',
  'Barishal',
  'Mymensingh',
  'Jamalpur',
  'Sherpur',
  'Netrokona',
  'Rangpur',
  'Dinajpur',
  'Gaibandha',
  'Kurigram',
  'Lalmonirhat',
  'Nilphamari',
  'Panchagarh',
  'Thakurgaon',
];

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const cartItems = useSelector(selectCartItems);
  const buyNowItem = useSelector(selectBuyNowItem);
  const cartTotal = useSelector(selectCartTotal);

  const [selectedCartKeys, setSelectedCartKeys] = useState([]);
  const [shipping, setShipping] = useState('standard');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const shippingCost =
    SHIPPING_OPTIONS.find((s) => s.id === shipping)?.price ?? 60;
  const selectedCartItems = useMemo(
    () =>
      cartItems.filter((item) => selectedCartKeys.includes(item.cartItemId)),
    [cartItems, selectedCartKeys],
  );

  const orderItems = buyNowItem
    ? [buyNowItem]
    : selectedCartKeys.length > 0
      ? selectedCartItems
      : cartItems;

  const subtotal = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : selectedCartKeys.length > 0
      ? selectedCartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      : cartTotal;

  const total = subtotal + shippingCost - discount;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Session থেকে user info pre-fill
  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '');
      setValue('email', session.user.email || '');
    }
  }, [session, setValue]);

  // Load selected cart items from cart page
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedCartKeys');
    if (stored) {
      try {
        setSelectedCartKeys(JSON.parse(stored));
      } catch (err) {
        setSelectedCartKeys([]);
      }
    }
  }, []);

  // Coupon check
  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true);
    setCouponMsg('');
    // Mock — real এ /api/coupon call করবে
    await new Promise((r) => setTimeout(r, 800));
    if (coupon.toUpperCase() === 'SAVE10') {
      const d = Math.round(subtotal * 0.1);
      setDiscount(d);
      setCouponMsg(`✓ 10% discount applied! You save ৳${d}`);
    } else {
      setDiscount(0);
      setCouponMsg('✗ Invalid coupon code');
    }
    setCouponLoading(false);
  };

  const onSubmit = (data) => {
    const orderData = {
      shippingInfo: data,
      shippingMethod: shipping,
      shippingCost,
      subtotal,
      discount,
      total,
      items: orderItems,
      selectedCartKeys,
    };
    console.log(orderData);
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/checkout/payment');
  };

  if (orderItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-white text-xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-white/40 text-sm mb-6">
          Add some products before checking out
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-400 to-indigo-500 text-white rounded-xl text-sm font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputCls =
    'w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none transition-all focus:border-sky-400/50 focus:bg-sky-400/[0.04] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.10)]';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* ══ LEFT — Shipping info ══ */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold"></span>
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Full Name
                </label>
                <input
                  className={inputCls}
                  placeholder="Rafiq Islam"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Email
                </label>
                <input
                  className={inputCls}
                  placeholder="you@example.com"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Phone Number
                </label>
                <input
                  className={inputCls}
                  placeholder="01XXXXXXXXX"
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^(\+880|880|0)?1[3-9]\d{8}$/,
                      message: 'Enter a valid Bangladeshi number',
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Street Address
                </label>
                <input
                  className={inputCls}
                  placeholder="House/Road/Block"
                  {...register('address', {
                    required: 'Address is required',
                  })}
                />
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                    District
                  </label>

                  <select
                    className={`select ${inputCls}`}
                    defaultValue=""
                    {...register('district', {
                      required: 'District is required',
                    })}
                  >
                    <option value="" disabled>
                      Pick a district
                    </option>
                    {DISTRICTS.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                    Post Code
                  </label>
                  <input
                    className={inputCls}
                    placeholder="1234"
                    {...register('postalCode', {
                      required: 'Post Code is required',
                    })}
                  />
                  {errors.postalCode && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-1.5 font-medium">
                  Order Note (Optional)
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none transition-all focus:border-sky-400/50 resize-none"
                  placeholder="Any special instructions..."
                  {...register('note')}
                />
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold"></span>
              Shipping Method
            </h2>
            <div className="space-y-2.5">
              {SHIPPING_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                    ${
                      shipping === opt.id
                        ? 'border-sky-400/50 bg-sky-400/[0.06]'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="accent-sky-400"
                    />
                    <span className="text-lg">{opt.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {opt.label}
                      </p>
                      <p className="text-white/35 text-xs">{opt.sub}</p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${opt.price === 0 ? 'text-emerald-400' : 'text-white'}`}
                  >
                    {opt.price === 0 ? 'FREE' : `৳${opt.price}`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Order summary ══ */}
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 sticky top-6">
            <h2 className="text-white font-semibold text-base mb-4">
              Order Summary
              <span className="ml-2 text-white/30 text-sm font-normal">
                ({orderItems.length} item{orderItems.length > 1 ? 's' : ''})
              </span>
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
              {orderItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.08] shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xl">
                        📦
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {item.color && (
                        <span className="flex items-center gap-1 text-[11px] text-white/40">
                          Color:
                          <span
                            className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                        </span>
                      )}
                      {item.size && (
                        <p className="text-white/35 text-xs mt-0.5">
                          {item.color && item.size && <span> · </span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </p>
                      )}
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white text-sm font-semibold shrink-0">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.07] mb-4" />

            {/* Coupon */}
            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-widest text-white/35 mb-2 font-medium">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="e.g. SAVE10"
                  className="flex-1 h-10 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-sky-400/50"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={couponLoading}
                  className="h-10 px-4 rounded-xl bg-white/[0.08] border border-white/10 text-white/70 text-sm font-medium hover:bg-white/[0.12] transition-all disabled:opacity-40"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </div>
              {couponMsg && (
                <p
                  className={`text-xs mt-1.5 ${couponMsg.startsWith('✓') ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {couponMsg}
                </p>
              )}
            </div>

            <div className="h-px bg-white/[0.07] mb-4" />

            {/* Price breakdown */}
            <div className="space-y-2.5 mb-5">
              {[
                { label: 'Subtotal', value: `৳${subtotal.toLocaleString()}` },
                {
                  label: 'Shipping',
                  value: shippingCost === 0 ? 'FREE' : `৳${shippingCost}`,
                  green: shippingCost === 0,
                },
                discount > 0 && {
                  label: 'Discount',
                  value: `-৳${discount}`,
                  green: true,
                },
              ]
                .filter(Boolean)
                .map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-white/45">{row.label}</span>
                    <span
                      className={
                        row.green
                          ? 'text-emerald-400 font-medium'
                          : 'text-white/70'
                      }
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              <div className="h-px bg-white/[0.07]" />
              <div className="flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold text-lg">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2
                bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
                shadow-[0_4px_20px_rgba(56,189,248,0.2)]
                hover:opacity-90 hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              Continue to Payment
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

            <p className="text-center text-white/20 text-[11px] mt-3 flex items-center justify-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              256-bit SSL encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
