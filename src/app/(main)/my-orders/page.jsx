'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/app/lib/api';
import ReviewModal from '@/Components/MyOrders/Modal/ReviewModal';

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

// ── Skeleton Loader Component ───────────────────────────────────────────────

function OrderSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-4 animate-pulse">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded hidden sm:block"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex -space-x-2">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="flex-1">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function MyOrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myOrders'],
    queryFn: () => apiFetch('/api/my-orders'),
  });

  // ── Loading state ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-[system-ui,sans-serif]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-12">
          <div className="h-8 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div>
          {[1, 2, 3].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Empty state ──
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-[system-ui,sans-serif]">
        {/* Breadcrumb (Kept same as original) */}
        {/* ... */}
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
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-xl sm:text-2xl font-bold">
              My Orders
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {orders.length} order{orders.length !== 1 ? 's' : ''} placed
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* ── Order cards ── */}
        <div className="space-y-4">
          {orders.map((order) => {
            const latestStage =
              order.orderTimeline?.[order.orderTimeline.length - 1]?.status ??
              'Order placed';
            const currentIdx = ALL_STAGES.indexOf(latestStage);
            const isDelivered = latestStage === 'Delivered';
            const isCancelled = latestStage === 'Cancelled';
            const payMeta =
              STATUS_META[order.paymentStatus] ?? STATUS_META.pending;
            const firstItem = order.items?.[0];
            const extraCount = (order.items?.length ?? 1) - 1;

            const reviewed = order.items?.every((item) => item.review === true);

            return (
              <Link
                key={order.orderId}
                href={`/my-orders/${order.orderId}`}
                className="block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-[0_4px_24px_rgba(79,70,229,0.08)] transition-all group"
              >
                {/* ── Card header ── */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Order ID
                      </p>
                      <p className="text-gray-800 font-bold text-sm font-mono mt-0.5">
                        {order.orderId}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Placed on
                      </p>
                      <p className="text-gray-700 text-sm font-medium mt-0.5">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Total
                      </p>
                      <p className="text-gray-900 font-bold text-sm mt-0.5">
                        ৳{order.total?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border ${payMeta.bg} ${payMeta.text} ${payMeta.border}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${payMeta.dot} ${order.paymentStatus === 'pending' ? 'animate-pulse' : ''}`}
                      />
                      {order.paymentStatus?.charAt(0).toUpperCase() +
                        order.paymentStatus?.slice(1)}
                    </span>
                  </div>
                </div>

                {/* ── Progress bar (mini) ── */}
                <div className="px-4 sm:px-6 py-3 bg-gray-50/60 border-b border-gray-100 overflow-x-auto">
                  <div className="flex items-center gap-1.5 min-w-[300px]">
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
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${done ? 'bg-green-500' : active ? 'bg-white border-2 border-green-500' : 'bg-gray-200'}`}
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
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-xs font-semibold ${isDelivered ? 'text-green-600' : isCancelled ? 'text-gray-400' : 'text-indigo-600'}`}
                    >
                      {isCancelled ? 'Cancelled' : latestStage}
                    </span>
                  </div>
                </div>

                {/* ── Product preview & Actions ── */}
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
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
                    </div>
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
                  </div>

                  {/* Right side Actions */}
                  <div className="flex items-center justify-end gap-3 sm:w-auto w-full border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    {/* Show Review Button ONLY if Delivered */}
                    {isDelivered && !reviewed && (
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        Write your review...
                      </button>
                    )}

                    <span className="flex items-center gap-1 text-indigo-600 text-xs font-semibold group-hover:gap-2 transition-all">
                      Details
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
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
