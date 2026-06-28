'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDate(dateVal) {
  if (!dateVal) return '';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleDateString('en-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const ALL_STAGES = [
  'Order placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for delivery',
  'Delivered',
];

const STATUS_META = {
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
  },
  paid: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  failed: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    dot: 'bg-red-400',
  },
  cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  },
};

const PAYMENT_LABEL = {
  'cash-on-delivery': 'Cash on Delivery',
  bkash: 'bKash',
  nagad: 'Nagad',
  card: 'Card Payment',
};

// ── Page ──────────────────────────────────────────────────────────────────

export default function MyOrdersPage() {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const myOrder = async () => {
      try {
        const res = await fetch(`/api/my-orders`, {
          cache: 'no-cache',
        });
        const result = await res.json();
        console.log(result);
        setOrder(result);
      } catch (error) {
        console.log(error);
      }
    };
    myOrder();
  }, []);

  // ── Empty state ──
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-[system-ui,sans-serif]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <svg
                className="w-3.5 h-3.5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                href="/account"
                className="hover:text-indigo-600 transition-colors"
              >
                My Account
              </Link>
              <svg
                className="w-3.5 h-3.5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-700 font-medium">My Orders</span>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-center py-32 px-4">
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-5xl mx-auto mb-6">
              📦
            </div>
            <h2 className="text-gray-800 text-xl font-bold mb-2">
              No orders yet
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              You haven't placed any orders. Start shopping and your orders will
              appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[system-ui,sans-serif]">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <svg
              className="w-3.5 h-3.5 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href="/account"
              className="hover:text-indigo-600 transition-colors"
            >
              My Account
            </Link>
            <svg
              className="w-3.5 h-3.5 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-700 font-medium">My Orders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-xl font-bold">My Orders</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {orders.length} order{orders.length !== 1 ? 's' : ''} placed
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* ── Order cards ── */}
        <div className="space-y-4">
          {orders.map((order) => {
            const latestStage =
              order.orderStatus?.[order.orderStatus.length - 1]?.stage ??
              'Order placed';
            const currentIdx = ALL_STAGES.indexOf(latestStage);
            const isDelivered = latestStage === 'Delivered';
            const isCancelled = latestStage === 'Cancelled';
            const payMeta =
              STATUS_META[order.paymentStatus] ?? STATUS_META.pending;
            const firstItem = order.items?.[0];
            const extraCount = (order.items?.length ?? 1) - 1;

            return (
              <Link
                key={order.orderId}
                href={`/my-orders/${order.orderId}`}
                className="block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-[0_4px_24px_rgba(79,70,229,0.08)] transition-all group"
              >
                {/* ── Card header ── */}
                <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Order ID */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Order ID
                      </p>
                      <p className="text-gray-800 font-bold text-sm font-mono mt-0.5">
                        {order.orderId}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                    {/* Date */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Placed on
                      </p>
                      <p className="text-gray-700 text-sm font-medium mt-0.5">
                        {formatDate(order.createAt)}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                    {/* Total */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Total
                      </p>
                      <p className="text-gray-900 font-bold text-sm mt-0.5">
                        ৳{order.total?.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                    {/* Payment */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Payment
                      </p>
                      <p className="text-gray-600 text-sm mt-0.5">
                        {PAYMENT_LABEL[order.paymentMethod] ??
                          order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* Right side — payment status + arrow */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border
                      ${payMeta.bg} ${payMeta.text} ${payMeta.border}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${payMeta.dot} ${order.paymentStatus === 'pending' ? 'animate-pulse' : ''}`}
                      />
                      {order.paymentStatus?.charAt(0).toUpperCase() +
                        order.paymentStatus?.slice(1)}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* ── Progress bar (mini) ── */}
                <div className="px-5 sm:px-6 py-3 bg-gray-50/60 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    {ALL_STAGES.map((stage, i) => {
                      const done = i <= currentIdx && !isCancelled;
                      const active = i === currentIdx && !isCancelled;
                      return (
                        <div
                          key={stage}
                          className="flex items-center flex-1 last:flex-none gap-1.5"
                        >
                          <div
                            title={stage}
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all
                              ${
                                done
                                  ? 'bg-green-500'
                                  : active
                                    ? 'bg-white border-2 border-green-500'
                                    : 'bg-gray-200'
                              }`}
                          >
                            {done && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
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
                            {active && !isCancelled && (
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                            )}
                          </div>
                          {i < ALL_STAGES.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 rounded-full ${i < currentIdx && !isCancelled ? 'bg-green-400' : 'bg-gray-200'}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Current stage label */}
                  <div className="flex items-center justify-between mt-1.5">
                    <span
                      className={`text-xs font-semibold
                      ${isDelivered ? 'text-green-600' : isCancelled ? 'text-gray-400' : 'text-indigo-600'}`}
                    >
                      {isCancelled ? 'Cancelled' : latestStage}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {currentIdx + 1} / {ALL_STAGES.length} steps
                    </span>
                  </div>
                </div>

                {/* ── Product preview ── */}
                <div className="px-5 sm:px-6 py-4 flex items-center gap-4">
                  {/* Images */}
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border-2 border-white shrink-0"
                        style={{ zIndex: 10 - i }}
                      >
                        {item.product?.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg text-gray-300">
                            📦
                          </div>
                        )}
                      </div>
                    ))}
                    {extraCount > 0 && (
                      <div
                        className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center shrink-0"
                        style={{ zIndex: 7 }}
                      >
                        <span className="text-gray-500 text-xs font-bold">
                          +{extraCount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* First item name + item count */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm font-medium truncate">
                      {firstItem?.product?.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {order.items?.length} item
                      {order.items?.length !== 1 ? 's' : ''}
                      {order.items?.length > 1
                        ? ` · ${order.items.length - 1} more`
                        : ''}
                    </p>
                  </div>

                  {/* View details */}
                  <span className="hidden sm:flex items-center gap-1.5 text-indigo-600 text-xs font-semibold group-hover:gap-2.5 transition-all shrink-0">
                    View Details
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-8 text-center pb-6">
          <Link
            href="/"
            className="inline-flex sm:hidden items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors mb-6"
          >
            Continue Shopping
          </Link>
          <p className="text-gray-400 text-xs">
            Need help?{' '}
            <a
              href="mailto:support@shopnest.com"
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
